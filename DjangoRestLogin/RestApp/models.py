from django.db import models

# Create your models here.

class Messages(models.Model):
  username = models.CharField(max_length=20)
  hora = models.CharField(max_length=10)
  message = models.TextField(max_length=100)
  