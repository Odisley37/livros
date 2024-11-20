from django.db import models

class Livro(models.Model):  # Alterado para começar com maiúscula
    livro = models.CharField(max_length=100)
    date = models.IntegerField()
    
    def __str__(self):
        return self.livro
