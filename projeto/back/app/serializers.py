from rest_framework import serializers
from .models import Formulario, ChecklistItem, CSVFile

class ChecklistItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChecklistItem
        fields = '__all__'

class FormularioSerializer(serializers.ModelSerializer):
    # Removemos o campo 'checklist' porque não estamos mais usando ManyToManyField
    class Meta:
        model = Formulario
        fields = '__all__'  # Inclui todos os campos do model Formulario

class CSVFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CSVFile
        fields = '__all__'