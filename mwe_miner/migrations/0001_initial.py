# Generated by Django 2.0.4 on 2019-01-10 11:23

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
            name='Run',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('minimum_frequency', models.IntegerField()),
                ('maximum_length', models.IntegerField()),
                ('minimum_length', models.IntegerField()),
                ('run_status', models.CharField(max_length=200)),
                ('run_started', models.DateTimeField()),
                ('run_completed', models.DateTimeField(blank=True, null=True)),
                ('description', models.CharField(max_length=200)),
                ('results', models.TextField()),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
