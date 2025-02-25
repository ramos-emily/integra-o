from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import (
    home, signup, user_login, user_logout, 
    CSVUploadView, formulario_view, salvar_checklist, 
    rendimento_equipe, minha_view_protegida, exportar_csv, analise_view,
    FormularioViewSet, ChecklistItemViewSet, CSVFileViewSet, quality_form_submit,
)

router = DefaultRouter()
router.register(r'formularios', FormularioViewSet)
router.register(r'checklist-itens', ChecklistItemViewSet)
router.register(r'csv-files', CSVFileViewSet)



urlpatterns = [
    path('', home, name='home'),
    path('signup/', signup, name='signup'),
    path('login/', user_login, name='login'),
    path('logout/', user_logout, name='logout'),
    path('upload-csv/', CSVUploadView.as_view(), name='upload_csv'),
    path('rendimento_equipe/', rendimento_equipe, name='rendimento_equipe'),
    path('formulario/', formulario_view, name='formulario'),
    path('salvar_checklist/<int:formulario_id>/', salvar_checklist, name='salvar_checklist'),
    path('protegida/', minha_view_protegida, name='protegida'),
    path('exportar-csv/', exportar_csv, name='exportar_csv'),
    path('analise/', analise_view, name='analise'),
    path('api/', include(router.urls)),  # URLs do DRF (api/formularios/, api/checklist-itens/, etc.)
    path('api/quality-form/', quality_form_submit, name='quality_form_submit'), 
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]