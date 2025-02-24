from django.contrib import admin
from .models import Formulario, ChecklistItem  # Importe os modelos

class FormularioAdmin(admin.ModelAdmin):
    # Campos exibidos na lista de formulários no admin
    list_display = ('number', 'created', 'country_of_request', 'percentual_conclusao')
    
    # Filtros disponíveis no admin
    list_filter = ('created', 'country_of_request')
    
    # Campos de busca no admin
    search_fields = ('number', 'country_of_request', 'assigned_to')
    
    # Campos exibidos no formulário de edição
    fieldsets = (
        (None, {
            'fields': ('number', 'created', 'country_of_request', 'assignment_group', 'assigned_to', 'state', 'channel', 'additional_comments')
        }),
        ('Checklists', {
            'fields': ('format', 'checks_and_handling', 'taxonomy')
        }),
        ('Conclusão', {
            'fields': ('percentual_conclusao',)
        }),
    )

    # Atualiza o percentual de conclusão ao salvar o formulário
    def save_model(self, request, obj, form, change):
        obj.atualizar_percentual_conclusao()
        super().save_model(request, obj, form, change)

# Registra o model Formulario com o FormularioAdmin
admin.site.register(Formulario, FormularioAdmin)

# Registre o modelo ChecklistItem (se já não estiver registrado)
@admin.register(ChecklistItem)
class ChecklistItemAdmin(admin.ModelAdmin):
    list_display = ('descricao', 'is_checked')  # Campos exibidos na lista
    search_fields = ('descricao',)  # Campos pesquisáveis
    