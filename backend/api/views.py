from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Livro  # Corrigido para 'Livro' com L maiúsculo
from .serializers import LivroSerializers


@api_view(['GET'])
def get_livros(request):
    livros = Livro.objects.all()
    serializedData = LivroSerializers(livros, many=True).data
    return Response(serializedData)

@api_view(['POST'])
def create_livros(request):
    data = request.data
    serializers = LivroSerializers(data=data)
    if serializers.is_valid():
        serializers.save()
        return Response(serializers.data, status=status.HTTP_201_CREATED)
    return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
        
        

 


