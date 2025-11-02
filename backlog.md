# 🔐 Especificações Técnicas - Sistema de Autenticação

## 📋 Visão Geral do Projeto
Sistema de autenticação completo com **tela de login e cadastro**, utilizando **JWT (JSON Web Tokens)** para gerenciamento de sessões e autenticação *stateless*.

---

## 🎯 Requisitos Funcionais

### 1. Tela de Autenticação

#### 1.1 Interface de Login

**Campos obrigatórios**
- **Username** (nome de usuário) — aceita formato com `@admin` para administradores  
- **Senha** (password)

**Funcionalidades**
- Checkbox “Lembrar-me” (opcional)  
- Link “Esqueceu a senha?” (redireciona para recuperação)  
- Validação *client-side* dos campos  
- Envio via AJAX para o backend  
- Exibição de erros de forma amigável  
- Detecção automática de perfil:  
  - Login com `username` → Usuário comum  
  - Login com `username@admin` → Administrador

---

#### 1.2 Interface de Cadastro

**Campos obrigatórios**
- **Username** (único, 3–20 caracteres, apenas usuários comuns)  
- **Email** (formato válido, único)  
- **Senha** (mínimo 8 caracteres)  
- **Confirmar senha**  
- **Aceitar termos de uso** (checkbox obrigatório)

**Funcionalidades**
- Validação de força da senha com indicador visual  
- Verificação em tempo real se senhas coincidem  
- Validação de unicidade de username (via API)  
- Envio via AJAX para o backend  

**Regras específicas**
- ⚠️ Não permite cadastro de administradores pelo formulário  
- Username **não pode conter** o sufixo `@admin`  
- Administradores **só podem ser criados via banco de dados**

---

#### 1.3 Login Social (Placeholder)

**Provedores disponíveis**
- Google OAuth 2.0  
- GitHub OAuth

**Comportamento atual**
- Botões visuais funcionais  
- Ao clicar, exibir notificação informando que está em desenvolvimento  
- Utiliza **Toastr** para notificações (leve e fácil de integrar com jQuery)

**Implementação futura**
- Fluxo completo OAuth 2.0  
- Vinculação de contas sociais

---

## 🔐 Autenticação JWT

### 2.1 Fluxo de Autenticação

#### Login Flow
1. Usuário envia credenciais (`username` + `password`)
   - Se `username` contém `@admin` → `is_admin = true`
   - Caso contrário → `is_admin = false`
2. Backend remove sufixo `@admin` do username para busca no banco  
3. Backend valida credenciais no banco  
4. Backend verifica se usuário tem `role = 'admin'`  
5. Se credencial contém `@admin` mas não é admin → erro *Acesso negado*  
6. Se válido, gera token JWT com `role` incluída no payload  
7. Retorna `token + dados do usuário (sem senha) + role`  
8. Frontend armazena token (`localStorage` ou `sessionStorage`)  
9. Frontend redireciona com base na role:
   - `admin` → `/admindashboard`
   - `user` → `/dashboard`

#### Registro Flow
1. Usuário envia dados (`username`, `email`, `password`)  
2. Backend valida se `username` não contém `@admin`  
3. Backend valida unicidade de `username` e `email`  
4. Backend aplica hash na senha (`bcrypt` ou `argon2`)  
5. Cria registro no banco de dados com `role = 'user'`  
6. Gera token JWT automaticamente (auto-login) com `role = 'user'`  
7. Retorna `token + dados do usuário`  
8. Frontend armazena token e redireciona para `dashboard`

---

### ⚠️ Cadastro de Administradores
Não é possível via interface web.  
Apenas via **INSERT direto no banco de dados**:

```sql
INSERT INTO users (username, email, password, role, created_at) 
VALUES ('admin_user', 'admin@example.com', '$2b$12$hashed_password', 'admin', NOW());


2.2 Estrutura do Token JWT
Payload sugerido
{
  "sub": "user_id_123",
  "username": "johndoe",
  "email": "john@example.com",
  "role": "user",
  "iat": 1635724800,
  "exp": 1635811200
}

Exemplo de payload para Admin
{
  "sub": "admin_id_456",
  "username": "admin_user",
  "email": "admin@example.com",
  "role": "admin",
  "iat": 1635724800,
  "exp": 1635811200
}

Headers
{
  "alg": "HS256",
  "typ": "JWT"
}


Configurações recomendadas

Algoritmo: HS256 (HMAC SHA-256)

Expiração: 24 horas (86400s)

Secret key: variável de ambiente forte (mín. 256 bits)

Refresh token: 7 dias (opcional, para renovação automática)

2.3 Armazenamento do Token
Opções
1️⃣ localStorage (recomendado para SPAs)

Persistente entre sessões

Acessível via JavaScript
⚠️ Vulnerável a ataques XSS

2️⃣ sessionStorage (mais seguro que localStorage)

Expira ao fechar o navegador

Acessível via JavaScript
⚠️ Ainda vulnerável a XSS

3️⃣ Cookie HttpOnly (mais seguro - recomendado)

Não acessível via JavaScript

Protegido contra XSS

Requer SameSite=Strict ou Lax

Backend gerencia automaticamente

🧩 Status:
✅ Estrutura de autenticação planejada
⚙️ Backend aguardando implementação JWT
🎨 Frontend pronto para integração AJAX