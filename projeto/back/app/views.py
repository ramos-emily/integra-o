from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.decorators import login_required
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Formulario, ChecklistItem, CSVFile
from .serializers import FormularioSerializer, ChecklistItemSerializer, CSVFileSerializer
from .forms import FormularioForm
from django.db.models import Avg
import pandas as pd
from .ai import sugerir_treinamentos, prever_erros_futuros
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth.models import User

class FormularioViewSet(viewsets.ModelViewSet):
    queryset = Formulario.objects.all()
    serializer_class = FormularioSerializer

    def perform_create(self, serializer):
        formulario = serializer.save()
        formulario.atualizar_percentual_conclusao()

class ChecklistItemViewSet(viewsets.ModelViewSet):
    queryset = ChecklistItem.objects.all()
    serializer_class = ChecklistItemSerializer
    permissions_class = [IsAuthenticated]

class CSVFileViewSet(viewsets.ModelViewSet):
    queryset = CSVFile.objects.all()
    serializer_class = CSVFileSerializer


# Views normais para funcionalidades personalizadas
def analise_view(request):
    # Chama as funções de IA
    sugestoes = sugerir_treinamentos()
    previsao = prever_erros_futuros()

    # Renderiza o template com os dados
    return render(request, 'analise.html', {
        'sugestoes': sugestoes,
        'previsao': previsao
    })

def exportar_csv(request):
    # Consulta os dados da tabela Formulario
    formularios = Formulario.objects.all()

    # Cria uma lista de dicionários com os dados
    dados = []
    for formulario in formularios:
        for item in formulario.checklist.all():
            dados.append({
                'nome': formulario.nome,
                'percentual_conclusao': formulario.percentual_conclusao,
                'data_criacao': formulario.data_criacao.strftime('%Y-%m-%d %H:%M:%S'),
                'checklist_descricao': item.descricao,
                'checklist_is_checked': item.is_checked
            })

    # Converte a lista de dicionários para um DataFrame do pandas
    df = pd.DataFrame(dados)

    # Cria uma resposta HTTP com o arquivo CSV
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="formularios_checklist.csv"'

    # Salva o DataFrame no response
    df.to_csv(response, index=False)

    return response

# Página inicial
def home(request):
    return HttpResponse("Bem-vindo à página inicial!")

# Cadastro de usuário


# Login de usuário
def user_login(request):
    if request.method == 'POST':
        # Verifica se uma chave de acesso foi enviada
        data = json.loads(request.body)
        access_key = data.get('access_key')

        # Chave de acesso fixa (apenas para exemplo)
        if access_key == 'minha_chave_secreta':
            return JsonResponse({'status': 'success', 'message': 'Login realizado com sucesso!'})
        else:
            return JsonResponse({'status': 'error', 'message': 'Chave de acesso inválida'}, status=400)
    else:
        return JsonResponse({'status': 'error', 'message': 'Método não permitido'}, status=405)


def signup(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')

            if not username or not password:
                return JsonResponse({'status': 'error', 'message': 'Usuário e senha são obrigatórios.'}, status=400)

            if User.objects.filter(username=username).exists():
                return JsonResponse({'status': 'error', 'message': 'Usuário já cadastrado.'}, status=400)

            user = User.objects.create_user(username=username, password=password)
            user.save()

            return JsonResponse({'status': 'success', 'message': 'Usuário criado com sucesso!'})
        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Erro no formato JSON.'}, status=400)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
    else:
        return JsonResponse({'status': 'error', 'message': 'Método não permitido.'}, status=405)

# Logout de usuário
def user_logout(request):
    logout(request)
    return redirect('home')

# Upload de CSV (API)
class CSVUploadView(APIView):
    def post(self, request, *args, **kwargs):
        file = request.FILES.get('file')
        if file:
            CSVFile.objects.create(file=file)
            return Response({'message': 'CSV upload com sucesso!'}, status=status.HTTP_201_CREATED)
        return Response({'error': 'Nenhum arquivo enviado.'}, status=status.HTTP_400_BAD_REQUEST)

# Formulário e Checklist
def formulario_view(request):
    if request.method == 'POST':
        form = FormularioForm(request.POST)
        if form.is_valid():
            # Cria um novo formulário com o nome do funcionário
            formulario = form.save()

            # Associa os itens do checklist marcados ao formulário
            for item in ChecklistItem.objects.all():
                item_id = f"item_{item.id}"
                if item_id in request.POST:
                    formulario.checklist.add(item)

            # Atualiza o percentual de conclusão
            formulario.atualizar_percentual_conclusao()

            # Redireciona para a página de detalhes do formulário
            return redirect('salvar_checklist', formulario_id=formulario.id)
    else:
        form = FormularioForm()

    # Recupera todos os itens do checklist para exibição no formulário
    checklist_itens = ChecklistItem.objects.all()
    return render(request, 'formulario.html', {'form': form, 'checklist_itens': checklist_itens})

def salvar_checklist(request, formulario_id):
    formulario = get_object_or_404(Formulario, id=formulario_id)

    if request.method == 'POST':
        # Atualiza os itens do checklist com base no que foi marcado
        for item in formulario.checklist.all():
            item_id = f"item_{item.id}"
            item.is_checked = item_id in request.POST
            item.save()

        # Atualiza o percentual de conclusão
        formulario.atualizar_percentual_conclusao()

        # Redireciona para a página de detalhes do formulário
        return redirect('salvar_checklist', formulario_id=formulario.id)

    return render(request, 'detalhes_formulario.html', {'formulario': formulario})

# Rendimento da Equipe
def rendimento_equipe(request):
    formularios = Formulario.objects.all()
    media_equipe = Formulario.objects.aggregate(media_rendimento=Avg('percentual_conclusao'))['media_rendimento']
    return render(request, 'rendimento_equipe.html', {
        'formularios': formularios,
        'media_equipe': media_equipe
    })

# Página protegida (exemplo)
@login_required
def minha_view_protegida(request):
    return render(request, 'protegida.html')


@csrf_exempt
def quality_form_submit(request):
    if request.method == 'POST':
        try:
            # Recebe os dados do frontend
            data = json.loads(request.body)
            
            # Cria um novo formulário com os dados recebidos
            formulario = Formulario.objects.create(
                number=data.get('number'),
                created=data.get('created'),
                country_of_request=data.get('country_of_request'),
                assignment_group=data.get('assignment_group'),
                assigned_to=data.get('assigned_to'),
                state=data.get('state'),
                channel=data.get('channel'),
                additional_comments=data.get('additional_comments'),
                format=data.get('format', []),
                checks_and_handling=data.get('checks_and_handling', []),
                taxonomy=data.get('taxonomy', [])
            )

            # Atualiza o percentual de conclusão
            formulario.atualizar_percentual_conclusao()

            # Retorna uma resposta de sucesso
            return JsonResponse({'status': 'success', 'message': 'Formulário salvo com sucesso!', 'id': formulario.id})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
    else:
        return JsonResponse({'status': 'error', 'message': 'Método não permitido'}, status=405)