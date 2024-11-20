from django.urls import path
from api.views import get_livros, create_livros, editar_livro

urlpatterns = [
    path('livros/', get_livros, name='get_livros'),
    path('livros/create', create_livros, name='create_livros'),
    path('livros/<int:pk>', editar_livro, name='editar_livro')
]
