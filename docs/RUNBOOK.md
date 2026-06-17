# Runbook de Despliegue - Hotel API

## 1. Requisitos Previos
* Git instalado.
* `kubectl` configurado para acceder al clúster de Kubernetes.
* Acceso a GitHub para gestionar Secrets.

## 2. Configuración de Secretos
Antes de ejecutar el pipeline, configure el secreto en el repositorio:
1. Ir a `Settings` > `Secrets and variables` > `Actions`.
2. Crear un nuevo `Repository Secret` llamado: `SUPABASE_URL` con el valor de conexión a su base de datos.

## 3. Despliegue del Sistema
1. **Push de Código:** Al realizar un `git push` a la rama `examen-cloud`, GitHub Actions ejecutará automáticamente:
   * Instalación de dependencias.
   * Ejecución de pruebas unitarias (`npm test`).
   * Construcción de la imagen Docker.
2. **Aplicación de Manifiestos:** Ejecute en su terminal el siguiente comando para aplicar los servicios y despliegues en el clúster:

   ```bash
   kubectl apply -f backend/k8s/

## 4. Verificación
Para verificar que el sistema está corriendo correctamente:
   ```bash
kubectl get pods
kubectl get hpa
