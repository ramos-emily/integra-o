from django import forms
from .models import Formulario, ChecklistItem
from django.db import models
from django.contrib.auth.models import User



class Checklist(models.Model):
    nome = models.CharField(max_length=100)  # Nome do checklist
    descricao = models.TextField(blank=True, null=True)  # Descrição opcional
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)  # Relaciona ao usuário

    def __str__(self):
        return self.nome

class ItemChecklist(models.Model):
    checklist = models.ForeignKey(Checklist, on_delete=models.CASCADE, related_name='itens')  # Relaciona ao checklist
    descricao = models.CharField(max_length=200)  # Descrição do item
    concluido = models.BooleanField(default=False)  # Status do item (marcado/não marcado)

    def __str__(self):
        return self.descricao

class FormularioForm(forms.ModelForm):
    nome = forms.CharField(max_length=100, required=True, widget=forms.TextInput(attrs={'placeholder': 'Digite o nome do formulário'}))  # Campo de input para o nome

    data_criacao = forms.DateTimeField(
        widget=forms.DateTimeInput(attrs={'type': 'datetime-local'}),
        required=True
    )

    class Meta:
        model = Formulario
        fields = ['nome', 'data_criacao']  # Removemos o checklist do formulário, pois ele será exibido separadamente

        