from django.contrib import admin
from tables.models import Table

# Register your models here.
@admin.register(Table)
class TableAdmin(admin.ModelAdmin):
    pass
