from rest_framework import serializers
from .models import Livro  # Corrigido para 'Livro' com L maiúsculo

class LivroSerializers(serializers.ModelSerializer):  # Corrigido para ModelSerializer
    class Meta:
        model = Livro
        fields = '__all__'
