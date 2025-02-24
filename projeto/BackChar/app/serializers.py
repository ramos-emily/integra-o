from rest_framework import serializers
from .models import Formulario, ChecklistItem, CSVFile

class ChecklistItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChecklistItem
        fields = '__all__'

class FormularioSerializer(serializers.ModelSerializer):
    checklist = serializers.PrimaryKeyRelatedField(
        many=True, queryset=ChecklistItem.objects.all()
    )

    class Meta:
        model = Formulario
        fields = '__all__'

class CSVFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CSVFile
        fields = '__all__'