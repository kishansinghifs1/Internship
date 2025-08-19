import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/components/ui/use-toast';

interface Project {
  id: string;
  name: string;
  type: string;
  location: string;
  startDate: string;
  endDate: string;
  budget: number;
  status: string;
  progress: number;
  createdAt: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
  projects: string[];
}

interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: string;
  projectId?: string;
}

interface AppContextType {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  projects: Project[];
  addProject: (project: Omit<Project, 'id' | 'createdAt'>) => void;
  users: User[];
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  documents: Document[];
  addDocument: (doc: Omit<Document, 'id' | 'uploadDate'>) => void;
}

const defaultAppContext: AppContextType = {
  sidebarOpen: false,
  toggleSidebar: () => {},
  projects: [],
  addProject: () => {},
  users: [],
  addUser: () => {},
  updateUser: () => {},
  documents: [],
  addDocument: () => {},
};

const AppContext = createContext<AppContextType>(defaultAppContext);

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  const addProject = (projectData: Omit<Project, 'id' | 'createdAt'>) => {
    const newProject: Project = {
      ...projectData,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    setProjects(prev => [...prev, newProject]);
    toast({ title: 'Success', description: 'Project created successfully!' });
  };

  const addUser = (userData: Omit<User, 'id'>) => {
    const newUser: User = {
      ...userData,
      id: uuidv4(),
    };
    setUsers(prev => [...prev, newUser]);
    toast({ title: 'Success', description: 'User added successfully!' });
  };

  const updateUser = (id: string, updates: Partial<User>) => {
    setUsers(prev => prev.map(user => 
      user.id === id ? { ...user, ...updates } : user
    ));
    toast({ title: 'Success', description: 'User updated successfully!' });
  };

  const addDocument = (docData: Omit<Document, 'id' | 'uploadDate'>) => {
    const newDoc: Document = {
      ...docData,
      id: uuidv4(),
      uploadDate: new Date().toISOString(),
    };
    setDocuments(prev => [...prev, newDoc]);
    toast({ title: 'Success', description: 'Document uploaded successfully!' });
  };

  return (
    <AppContext.Provider
      value={{
        sidebarOpen,
        toggleSidebar,
        projects,
        addProject,
        users,
        addUser,
        updateUser,
        documents,
        addDocument,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};