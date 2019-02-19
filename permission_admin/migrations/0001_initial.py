# Generated by Django 2.0.2 on 2019-02-13 10:17

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Dataset',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('index', models.CharField(max_length=100)),
                ('mapping', models.CharField(max_length=100)),
                ('daterange', models.TextField()),
                ('access', models.CharField(default='private', max_length=7)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='ScriptProject',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('desc', models.TextField()),
                ('entrance_point', models.CharField(max_length=100)),
                ('arguments', models.TextField()),
                ('last_modified', models.DateTimeField()),
            ],
        ),
    ]