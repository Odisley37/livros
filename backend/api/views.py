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
 
@api_view(['PUT', 'DELETE']) 
def editar_livro(request, pk):
    try:
        livro = Livro.objects.get(pk=pk)
    except Livro.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'DELETE':
        livro.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    elif request.method == 'PUT':
        data = request.data 
        serializer = LivroSerializers(livro, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
