# Generated by Django 5.1.6 on 2025-02-20 13:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ChecklistItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('is_checked', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Formulario',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=100)),
                ('data_criacao', models.DateTimeField(auto_now_add=True)),
                ('checklist', models.ManyToManyField(blank=True, to='app.checklistitem')),
            ],
        ),
    ]
