# Generated by Django 5.1.6 on 2025-02-20 23:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0007_auto_20250220_1955'),
    ]

    operations = [
        migrations.AddField(
            model_name='checklistitem',
            name='name',
            field=models.CharField(default='Item Padrão', max_length=255),
        ),
    ]
