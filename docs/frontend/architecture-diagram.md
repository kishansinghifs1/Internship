# BuildBridge AI - System Architecture Documentation

## 1. High-Level System Architecture

```mermaid
graph TB
    subgraph "Frontend Layer"
        A[React App] --> B[Router]
        B --> C[Pages]
        B --> D[Components]
        C --> E[Landing Page]
        C --> F[Dashboard]
        C --> G[Services]
        C --> H[Payment Gateway]
        D --> I[UI Components]
        D --> J[Feature Components]
    end
    
    subgraph "State Management"
        K[AuthContext] --> L[User State]
        M[AppContext] --> N[App State]
        O[React Query] --> P[Server State]
    end
    
    subgraph "External Services"
        Q[Supabase] --> R[Database]
        Q --> S[Authentication]
        Q --> T[Storage]
        U[Payment Gateway] --> V[Stripe/Razorpay]
    end
    
    A --> K
    A --> M
    A --> O
    O --> Q
    H --> U
```

## 2. Component Hierarchy

```mermaid
graph TD
    A[App.tsx] --> B[ThemeProvider]
    B --> C[QueryClientProvider]
    C --> D[TooltipProvider]
    D --> E[AuthProvider]
    E --> F[BrowserRouter]
    F --> G[Routes]
    
    G --> H[Index Page]
    G --> I[Services Page]
    G --> J[AboutUs Page]
    G --> K[ContactUs Page]
    G --> L[PaymentGateway Page]
    G --> M[NotFound Page]
    
    H --> N[Landing Component]
    H --> O[DemoLogin Component]
    H --> P[AppLayout Component]
    
    P --> Q[TopNavigation]
    P --> R[Sidebar]
    P --> S[Main Content Area]
    
    S --> T[DashboardOverview]
    S --> U[ProjectList]
    S --> V[MarketplaceView]
    S --> W[AnalyticsDashboard]
    S --> X[SiteUpdate]
    S --> Y[SiteVerification]
    S --> Z[UserManagement]
    S --> AA[CompanyProfile]
    S --> BB[AccountSettings]
    S --> CC[MyProfile]
    S --> DD[Integrations]
    S --> EE[UploadDocuments]
```

## 3. User Authentication Flow

```mermaid
sequenceDiagram
    participant U as User
    participant L as Landing Page
    participant DL as Demo Login
    participant AC as AuthContext
    participant AL as AppLayout
    participant D as Dashboard
    
    U->>L: Visit Landing Page
    U->>L: Click "Login" Button
    L->>DL: Show Demo Login
    U->>DL: Select Demo Account
    U->>DL: Click Login
    DL->>AC: Call login(userType, email)
    AC->>AC: Set User State
    AC->>AC: Store in localStorage
    AC->>AL: Render AppLayout
    AL->>D: Show Dashboard
    D->>U: Display Role-Specific Dashboard
```

## 4. Data Flow Architecture

```mermaid
graph LR
    subgraph "User Interface"
        A[Components] --> B[Context Providers]
        B --> C[State Management]
    end
    
    subgraph "Data Layer"
        C --> D[Local State]
        C --> E[Local Storage]
        C --> F[React Query Cache]
    end
    
    subgraph "External APIs"
        F --> G[Supabase API]
        G --> H[Database]
        G --> I[Auth Service]
        G --> J[Storage Service]
    end
    
    subgraph "Third Party Services"
        K[Payment Gateway] --> L[Stripe/Razorpay]
        M[AI Services] --> N[Analytics Engine]
        O[File Upload] --> P[Cloud Storage]
    end
```

## 5. Feature Module Architecture

```mermaid
graph TB
    subgraph "Core Modules"
        A[Dashboard] --> A1[Overview]
        A --> A2[Analytics]
        A --> A3[Reports]
        
        B[Projects] --> B1[Project List]
        B --> B2[Create Project]
        B --> B3[Project Details]
        
        C[Marketplace] --> C1[Vendor Discovery]
        C --> C2[RFQ Management]
        C --> C3[Vendor Profiles]
        
        D[Site Management] --> D1[Site Updates]
        D --> D2[Site Verification]
        D --> D3[Quality Control]
    end
    
    subgraph "Supporting Modules"
        E[User Management] --> E1[Team Members]
        E --> E2[Roles & Permissions]
        
        F[Company] --> F1[Company Profile]
        F --> F2[Settings]
        
        G[Documents] --> G1[Upload]
        G --> G2[Management]
        
        H[Integrations] --> H1[Third Party]
        H --> H2[API Connections]
    end
```

## 6. User Role Permissions Matrix

```mermaid
graph LR
    subgraph "User Types"
        A[Construction Firm]
        B[Vendor/Supplier]
        C[Client/Owner]
    end
    
    subgraph "Feature Access"
        D[Dashboard Access]
        E[Project Management]
        F[Marketplace]
        G[Analytics]
        H[Site Management]
        I[User Management]
        J[Company Settings]
    end
    
    A --> D
    A --> E
    A --> F
    A --> G
    A --> H
    A --> I
    A --> J
    
    B --> D
    B --> F
    B --> G
    B --> J
    
    C --> D
    C --> E
    C --> G
    C --> J
```

## 7. State Management Flow

```mermaid
graph TD
    A[User Action] --> B[Component]
    B --> C[Context Hook]
    C --> D[Context Provider]
    D --> E[State Update]
    E --> F[Re-render Components]
    F --> G[UI Update]
    
    subgraph "Context Types"
        H[AuthContext]
        I[AppContext]
        J[ThemeContext]
    end
    
    C --> H
    C --> I
    C --> J
```

## 8. File Structure Overview

```
src/
├── components/
│   ├── ui/           # Reusable UI components
│   ├── auth/         # Authentication components
│   ├── dashboard/    # Dashboard components
│   ├── projects/     # Project management
│   ├── marketplace/  # Vendor marketplace
│   ├── analytics/    # Analytics and reports
│   ├── site/         # Site management
│   ├── users/        # User management
│   ├── company/      # Company settings
│   ├── documents/    # Document management
│   ├── integrations/ # Third-party integrations
│   ├── profile/      # User profile
│   ├── settings/     # Account settings
│   └── layout/       # Layout components
├── pages/            # Main page components
├── contexts/         # React contexts
├── hooks/            # Custom hooks
├── lib/              # Utility functions
└── main.tsx          # App entry point
```

## 9. Technology Stack Diagram

```mermaid
graph TB
    subgraph "Frontend Framework"
        A[React 18] --> B[TypeScript]
        B --> C[Vite]
    end
    
    subgraph "UI & Styling"
        D[Shadcn/ui] --> E[Radix UI]
        F[Tailwind CSS] --> G[Custom Styles]
    end
    
    subgraph "State Management"
        H[React Context] --> I[Local Storage]
        J[React Query] --> K[Server State]
    end
    
    subgraph "Routing & Navigation"
        L[React Router] --> M[Browser Router]
    end
    
    subgraph "Forms & Validation"
        N[React Hook Form] --> O[Zod Validation]
    end
    
    subgraph "Charts & Visualization"
        P[Recharts] --> Q[Analytics Charts]
    end
    
    subgraph "Backend Services"
        R[Supabase] --> S[Database]
        R --> T[Authentication]
        R --> U[Storage]
    end
    
    A --> D
    A --> F
    A --> H
    A --> J
    A --> L
    A --> N
    A --> P
    J --> R
```

## 10. Development Workflow

```mermaid
graph LR
    A[Development] --> B[TypeScript Compilation]
    B --> C[Vite Build]
    C --> D[Development Server]
    D --> E[Hot Module Replacement]
    E --> F[Browser Testing]
    F --> G[Code Review]
    G --> H[Production Build]
    H --> I[Deployment]
``` 