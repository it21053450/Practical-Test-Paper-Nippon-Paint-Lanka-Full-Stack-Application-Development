# Material Management System

A full-stack web application built with Next.js frontend and .NET Core backend, using MS SQL Server as the database.

## Project Structure

```
NIppon Paint/
├── frontend/                    # Next.js application
│   ├── app/                    # Next.js 14 app directory
│   ├── components/             # React components
│   ├── contexts/               # React contexts
│   ├── lib/                    # Utility functions and API client
│   ├── config/                 # Configuration files
│   └── package.json           # Frontend dependencies
├── backend/                    # .NET Core Web API
│   ├── Controllers/            # API controllers
│   ├── Models/                 # Data models
│   ├── Services/               # Business logic services
│   ├── Data/                   # Entity Framework DbContext
│   ├── DTOs/                   # Data Transfer Objects
│   ├── Migrations/             # Database migrations
│   └── MaterialManagement.API.csproj
├── database/                   # SQL scripts and database files
│   ├── 01_CreateDatabase.sql
│   ├── 02_CreateTables.sql
│   └── 03_InsertSampleData.sql
├── setup-backend.bat          # Backend setup script
├── setup-frontend.bat         # Frontend setup script
├── setup-database.bat         # Database setup script
└── README.md                  # This file
```

## Features

- **User Authentication**: Secure login and registration with JWT tokens
- **User Dashboard**: Clean and intuitive dashboard interface
- **Material Management**: Complete CRUD operations for materials
- **Modern UI**: Responsive design with Tailwind CSS
- **Real-time Updates**: Dynamic material list updates
- **Search Functionality**: Search materials by name, code, or batch
- **Form Validation**: Client-side and server-side validation
- **Error Handling**: Comprehensive error handling and user feedback

## Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React Hook Form** - Form handling and validation
- **Axios** - HTTP client for API calls
- **React Hot Toast** - Toast notifications
- **Lucide React** - Beautiful icons

### Backend
- **.NET Core 8** - Web API framework
- **Entity Framework Core** - ORM for database operations
- **JWT Authentication** - Secure token-based authentication
- **BCrypt** - Password hashing
- **Swagger/OpenAPI** - API documentation
- **CORS** - Cross-origin resource sharing

### Database
- **MS SQL Server** - Relational database
- **Entity Framework Migrations** - Database versioning

## Quick Setup
### Manual Setup

#### Prerequisites
- Node.js 18+ 
- .NET Core 8 SDK
- MS SQL Server (LocalDB or full instance)
- Visual Studio Code or Visual Studio

#### Database Setup
1. Ensure MS SQL Server is running
2. Run the SQL scripts in order:
   ```bash
   sqlcmd -S "(localdb)\mssqllocaldb" -i "database\01_CreateDatabase.sql"
   sqlcmd -S "(localdb)\mssqllocaldb" -i "database\02_CreateTables.sql"
   sqlcmd -S "(localdb)\mssqllocaldb" -i "database\03_InsertSampleData.sql"
   ```

#### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Restore packages:
   ```bash
   dotnet restore
   ```

3. Update connection string in `appsettings.json` if needed:
   ```json
   "ConnectionStrings": {
     "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=MaterialManagementDB;Trusted_Connection=true;MultipleActiveResultSets=true"
   }
   ```

4. Run database migrations:
   ```bash
   dotnet ef database update
   ```

5. Start the API:
   ```bash
   dotnet run
   ```

   The API will be available at: `https://localhost:7000`
   Swagger UI: `https://localhost:7000/swagger`

#### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Update API URL in `config/api.ts` if needed:
   ```typescript
   export const API_CONFIG = {
     BASE_URL: 'https://localhost:7000/api',
   }
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

   The application will be available at: `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Materials (Protected Routes)
- `GET /api/materials` - Get all materials for authenticated user
- `GET /api/materials/{id}` - Get material by ID
- `POST /api/materials` - Create new material
- `PUT /api/materials/{id}` - Update material
- `DELETE /api/materials/{id}` - Delete material

## Default Credentials
- **Email**: admin@example.com
- **Password**: Admin123!

## Usage Guide

### 1. Login/Register
- Visit the application at `http://localhost:3000`
- Use the default credentials or register a new account
- The system will redirect you to the dashboard upon successful authentication

### 2. Material Management
- **View Materials**: All materials are displayed in a table format
- **Add Material**: Click "Add Material" button to create new materials
- **Edit Material**: Click the edit icon next to any material
- **Delete Material**: Click the delete icon and confirm the action
- **Search**: Use the search bar to filter materials by name, code, or batch

### 3. User Profile
- Your email is displayed in the top-right corner
- Click "Logout" to sign out of the application

## Development Notes

### Security Features
- JWT token-based authentication
- Password hashing with BCrypt
- User-scoped material operations
- CORS configuration for frontend-backend communication

### Error Handling
- Client-side form validation
- Server-side validation and error responses
- Toast notifications for user feedback
- Proper HTTP status codes

### Database Design
- **Users Table**: Stores user credentials and profile information
- **Materials Table**: Stores material data with foreign key relationship to users
- **Indexes**: Optimized queries with proper indexing

### Code Organization
- **Frontend**: Component-based architecture with custom hooks
- **Backend**: Clean architecture with separation of concerns
- **API**: RESTful design with proper HTTP methods
- **Database**: Entity Framework with migrations

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure MS SQL Server is running
   - Check connection string in `appsettings.json`
   - Verify database exists and is accessible

2. **CORS Issues**
   - Ensure backend is running on the correct port
   - Check CORS configuration in `Program.cs`
   - Verify frontend API URL configuration

3. **Authentication Issues**
   - Check JWT secret key configuration
   - Verify token expiration settings
   - Ensure proper token storage in localStorage

4. **Build Errors**
   - Run `dotnet restore` for backend dependencies
   - Run `npm install` for frontend dependencies
   - Check .NET Core and Node.js versions

### Support
For issues or questions, please check the console logs and ensure all prerequisites are properly installed.
