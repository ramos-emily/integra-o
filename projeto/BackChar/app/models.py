from django.db import models
from django.utils import timezone

class CSVFile(models.Model):
    file = models.FileField(upload_to='csv/', verbose_name="Arquivo CSV")
    uploaded_at = models.DateTimeField(auto_now_add=True, verbose_name="Data de Upload")
    
    def __str__(self):
        return f"Arquivo CSV {self.id} - {self.uploaded_at.strftime('%Y-%m-%d %H:%M')}"
    
    class Meta:
        verbose_name = "Arquivo CSV"
        verbose_name_plural = "Arquivos CSV"

class ChecklistItem(models.Model):
    descricao = models.CharField(max_length=255, default="Descrição Padrão", verbose_name="Descrição")
    is_checked = models.BooleanField(default=False, verbose_name="Concluído")
    
    def __str__(self):
        return self.descricao
    
    class Meta:
        verbose_name = "Item do Checklist"
        verbose_name_plural = "Itens do Checklist"

class Formulario(models.Model):
    nome = models.CharField(max_length=100, verbose_name="Nome do Formulário")
    data_criacao = models.DateTimeField(default=timezone.now, verbose_name="Data de Criação")
    checklist = models.ManyToManyField(ChecklistItem, blank=True, verbose_name="Itens do Checklist")
    percentual_conclusao = models.FloatField(default=0.0, verbose_name="Percentual de Conclusão")
    
    def __str__(self):
        return self.nome
    
    def atualizar_percentual_conclusao(self):
        total_itens = self.checklist.count()
        if total_itens == 0:
            self.percentual_conclusao = 0
        else:
            itens_concluidos = self.checklist.filter(is_checked=True).count()
            self.percentual_conclusao = round((itens_concluidos / total_itens) * 100, 2)
        self.save()
    
    class Meta:
        verbose_name = "Formulário"
        verbose_name_plural = "Formulários"
