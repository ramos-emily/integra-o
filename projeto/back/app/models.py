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
    number = models.CharField(
        max_length=100, 
        verbose_name="Número", 
        default="N/A"  # Valor padrão
    )
    created = models.CharField(
        max_length=100, 
        verbose_name="Criado em", 
        default="N/A"  # Valor padrão
    )
    country_of_request = models.CharField(
        max_length=100, 
        verbose_name="País da Solicitação", 
        default="N/A"  # Valor padrão
    )
    assignment_group = models.CharField(
        max_length=100, 
        verbose_name="Grupo de Atribuição", 
        default="N/A"  # Valor padrão
    )
    assigned_to = models.CharField(
        max_length=100, 
        verbose_name="Atribuído a", 
        null=True,  # Permite valores nulos no banco de dados
        blank=True,  # Permite campos vazios no formulário
        default="N/A"  # Valor padrão
    )
    state = models.CharField(
        max_length=100, 
        verbose_name="Estado", 
        default="N/A"  # Valor padrão
    )
    channel = models.CharField(
        max_length=100, 
        verbose_name="Canal", 
        default="N/A"  # Valor padrão
    )
    additional_comments = models.TextField(
        blank=True, 
        null=True, 
        verbose_name="Comentários Adicionais", 
        default="N/A"  # Valor padrão
    )
    format = models.JSONField(
        default=list, 
        verbose_name="Formato"
    )
    checks_and_handling = models.JSONField(
        default=list, 
        verbose_name="Checks e Handling"
    )
    taxonomy = models.JSONField(
        default=list, 
        verbose_name="Taxonomia"
    )
    percentual_conclusao = models.FloatField(
        default=0.0, 
        verbose_name="Percentual de Conclusão"
    )
    
    def __str__(self):
        return f"Formulário {self.number}"
    
    def atualizar_percentual_conclusao(self):
        total_itens = len(self.format) + len(self.checks_and_handling) + len(self.taxonomy)
        if total_itens == 0:
            self.percentual_conclusao = 0
        else:
            itens_concluidos = sum(1 for item in self.format + self.checks_and_handling + self.taxonomy if item)
            self.percentual_conclusao = round((itens_concluidos / total_itens) * 100, 2)
        self.save()
    
    class Meta:
        verbose_name = "Formulário"
        verbose_name_plural = "Formulários"