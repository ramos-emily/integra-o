from django.db import models
from django.utils import timezone

class CSVFile(models.Model):
    """
    Modelo para armazenar arquivos CSV enviados pelos usuários.
    """
    file = models.FileField(upload_to='csv/', verbose_name="Arquivo CSV")  # Campo para upload de arquivos CSV
    uploaded_at = models.DateTimeField(auto_now_add=True, verbose_name="Data de Upload")  # Data e hora do upload

    def __str__(self):
        return f"Arquivo CSV {self.id} - {self.uploaded_at.strftime('%Y-%m-%d %H:%M')}"

    class Meta:
        verbose_name = "Arquivo CSV"
        verbose_name_plural = "Arquivos CSV"


class ChecklistItem(models.Model):
    """
    Modelo para representar um item do checklist.
    """
    descricao = models.CharField(max_length=255, default="Descrição Padrão", verbose_name="Descrição")  # Descrição do item
    is_checked = models.BooleanField(default=False, verbose_name="Concluído")  # Status do item (marcado/não marcado)

    def __str__(self):
        return self.descricao

    class Meta:
        verbose_name = "Item do Checklist"
        verbose_name_plural = "Itens do Checklist"


class Formulario(models.Model):
    """
    Modelo para representar um formulário com um checklist associado.
    """
    nome = models.CharField(max_length=100, verbose_name="Nome do Formulário")  # Nome do formulário
    data_criacao = models.DateTimeField(default=timezone.now, verbose_name="Data de Criação")  # Data de criação
    checklist = models.ManyToManyField(ChecklistItem, blank=True, verbose_name="Itens do Checklist")  # Itens do checklist
    percentual_conclusao = models.FloatField(default=0.0, verbose_name="Percentual de Conclusão")  # Percentual de conclusão

    def __str__(self):
        return self.nome

    def atualizar_percentual_conclusao(self):
        """
        Atualiza o percentual de conclusão do formulário com base nos itens do checklist marcados.
        """
        total_itens = self.checklist.count()  # Total de itens no checklist
        if total_itens == 0:
            self.percentual_conclusao = 0  # Evita divisão por zero
        else:
            itens_concluidos = self.checklist.filter(is_checked=True).count()  # Itens concluídos
            self.percentual_conclusao = round((itens_concluidos / total_itens) * 100, 2)  # Calcula o percentual
        self.save()  # Salva o percentual no banco de dados

    class Meta:
        verbose_name = "Formulário"
        verbose_name_plural = "Formulários"