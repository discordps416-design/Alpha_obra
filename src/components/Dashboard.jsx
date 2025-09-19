// Dashboard.jsx - Versão Melhorada com Mais Funcionalidades e Melhor Visual

import React, { useState } from 'react';

// --- ÍCONES (SVGs para um visual mais profissional) ---
const BuildingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>;
const CashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const ChartPieIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>;
const PlusCircleIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" className={props.className || "h-6 w-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const BellIcon = () => <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>;
const SearchIcon = () => <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;


// --- DADOS FALSOS (MOCK) ---
const user = { name: 'Carlos Silva', avatar: 'CS' };
const tasks = [
    { id: 1, title: 'Comprar tintas para acabamento', project: 'Casa Alphaville', due: 'Vence amanhã', overdue: false },
    { id: 2, title: 'Revisar projeto elétrico com cliente', project: 'Ed. Central', due: 'Vence em 3 dias', overdue: false },
    { id: 3, title: 'Pagar medição do pedreiro', project: 'Casa Alphaville', due: 'ATRASADA', overdue: true },
    { id: 4, title: 'Verificar instalação hidráulica', project: 'Ed. Central', due: 'Concluída', overdue: false, completed: true },
];
const projects = [
    { id: 1, name: 'Casa Alphaville', progress: 65, spent: 85200, budget: 150000, alerts: 1 },
    { id: 2, name: 'Reforma Ed. Central', progress: 30, spent: 42000, budget: 90000, alerts: 0 },
    { id: 3, name: 'Construção Galpão', progress: 80, spent: 195000, budget: 210000, alerts: 0 },
];
const activities = [
    { person: 'José (Pedreiro)', action: 'adicionou 3 fotos à galeria da', project: 'Casa Alphaville', type: 'photo' },
    { person: 'Você', action: 'comentou na tarefa "Instalação Hidráulica" da', project: 'Reforma Ed. Central', type: 'comment' },
    { person: 'Maria (Eletricista)', action: 'marcou a tarefa "Passar conduítes" como concluída', project: 'Casa Alphaville', type: 'check' },
]

// --- COMPONENTES AUXILIARES ---
const DonutChart = ({ spent, budget }) => {
    const percentage = (spent / budget) * 100;
    const strokeDasharray = `${percentage}, 100`;
    return (
        <div className="relative flex items-center justify-center w-24 h-24">
            <svg className="w-full h-full" viewBox="0 0 36 36">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e6e6e6" strokeWidth="3" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#4c51bf" strokeWidth="3" strokeDasharray={strokeDasharray} strokeDashoffset="25" />
            </svg>
            <span className="absolute text-lg font-bold text-gray-700">{Math.round(percentage)}%</span>
        </div>
    );
};

const ExpenseModal = ({ setShowModal }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6">Adicionar Nova Despesa</h2>
            <form>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="description">Descrição</label>
                    <input className="w-full p-2 border rounded" id="description" type="text" placeholder="Ex: Compra de cimento" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="amount">Valor</label>
                    <input className="w-full p-2 border rounded" id="amount" type="number" placeholder="150.00" />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 mb-2" htmlFor="project">Associar à Obra</label>
                    <select className="w-full p-2 border rounded bg-white" id="project">
                        <option>Casa Alphaville</option>
                        <option>Reforma Ed. Central</option>
                        <option>Construção Galpão</option>
                    </select>
                </div>
                <div className="flex justify-end gap-4">
                    <button type="button" onClick={() => setShowModal(false)} className="py-2 px-4 bg-gray-200 rounded hover:bg-gray-300">Cancelar</button>
                    <button type="submit" className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700">Salvar Despesa</button>
                </div>
            </form>
        </div>
    </div>
);


export default function Dashboard() {
    const [taskFilter, setTaskFilter] = useState('pendentes');
    const [showModal, setShowModal] = useState(false);
    
    const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
    const totalSpent = projects.reduce((sum, p) => sum + p.spent, 0);

    const filteredTasks = tasks.filter(task => {
        if (taskFilter === 'pendentes') return !task.completed;
        if (taskFilter === 'atrasadas') return task.overdue;
        return true; // 'todas'
    });

    return (
        <div className="bg-gray-100 min-h-screen font-sans">
            {showModal && <ExpenseModal setShowModal={setShowModal} />}

            <div className="flex">
                {/* --- MENU LATERAL (SIDEBAR) --- */}
                <aside className="w-64 bg-white shadow-md h-screen flex flex-col">
                    <div className="p-6 font-bold text-2xl text-blue-600 border-b">Obra na Mão</div>
                    <nav className="mt-6 flex-1">
                        <a href="#" className="flex items-center gap-3 py-3 px-6 bg-blue-50 text-blue-700 font-semibold rounded-lg"><ChartPieIcon className="h-6 w-6"/>Painel</a>
                        <a href="#" className="flex items-center gap-3 py-3 px-6 text-gray-600 hover:bg-gray-100"><BuildingIcon className="h-6 w-6"/>Obras</a>
                        <a href="#" className="flex items-center gap-3 py-3 px-6 text-gray-600 hover:bg-gray-100"><CashIcon className="h-6 w-6"/>Financeiro</a>
                    </nav>
                </aside>

                <main className="flex-1 p-8">
                    {/* --- CABEÇALHO (HEADER) --- */}
                    <header className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">Seu Painel de Controle</h1>
                            <p className="text-gray-500">Bem-vindo de volta, {user.name}!</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <BellIcon />
                            <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-full font-bold">{user.avatar}</div>
                        </div>
                    </header>
                    
                    {/* --- BOTÕES DE AÇÃO RÁPIDA --- */}
                    <div className="mb-8 flex gap-4">
                        <button className="flex items-center gap-2 py-2 px-4 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors">
                            <PlusCircleIcon className="h-5 w-5"/> Nova Obra
                        </button>
                        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 py-2 px-4 bg-white text-gray-700 border rounded-lg shadow hover:bg-gray-50 transition-colors">
                            <PlusCircleIcon className="h-5 w-5"/> Adicionar Despesa
                        </button>
                    </div>

                    {/* --- CONTEÚDO PRINCIPAL (DASHBOARD) --- */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        
                        {/* Bloco 1: "Visão Geral do Gestor" */}
                        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="flex items-center bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
                                <BuildingIcon/><div className="ml-4"><h3 className="text-gray-500">Obras Ativas</h3><p className="text-3xl font-bold mt-1">{projects.length}</p></div>
                            </div>
                            <div className="flex items-center bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
                                <CashIcon/><div className="ml-4"><h3 className="text-gray-500">Orçamento Total</h3><p className="text-3xl font-bold mt-1">R$ {totalBudget.toLocaleString('pt-BR')}</p></div>
                            </div>
                            <div className="flex items-center bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
                                <DonutChart spent={totalSpent} budget={totalBudget} /><div className="ml-4"><h3 className="text-gray-500">Total Gasto</h3><p className="text-3xl font-bold mt-1">R$ {totalSpent.toLocaleString('pt-BR')}</p></div>
                            </div>
                        </div>
                        
                        {/* Bloco 2: "Minhas Tarefas" com Filtro */}
                        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow lg:col-span-2">
                             <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-lg">Minhas Tarefas</h3>
                                <div className="flex gap-2">
                                    <button onClick={() => setTaskFilter('pendentes')} className={`py-1 px-3 rounded-full text-sm ${taskFilter === 'pendentes' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>Pendentes</button>
                                    <button onClick={() => setTaskFilter('atrasadas')} className={`py-1 px-3 rounded-full text-sm ${taskFilter === 'atrasadas' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}>Atrasadas</button>
                                    <button onClick={() => setTaskFilter('todas')} className={`py-1 px-3 rounded-full text-sm ${taskFilter === 'todas' ? 'bg-gray-500 text-white' : 'bg-gray-200'}`}>Todas</button>
                                </div>
                             </div>
                             <div className="space-y-3">
                                {filteredTasks.map(task => (
                                    <div key={task.id} className="flex items-center p-2 rounded hover:bg-gray-50">
                                        <input type="checkbox" defaultChecked={task.completed} className="mr-3 h-5 w-5"/>
                                        <span className="flex-1">{task.title} - <span className="text-gray-500">{task.project}</span></span>
                                        <span className={`font-semibold ${task.overdue ? 'text-red-500' : 'text-gray-600'}`}>{task.due}</span>
                                    </div>
                                ))}
                             </div>
                        </div>

                        {/* Bloco 3: "Acompanhamento das Obras" */}
                        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow lg:col-span-1 row-span-2">
                             <h3 className="font-bold text-lg mb-4">Acompanhamento das Obras</h3>
                             <div className="space-y-4">
                                {projects.map(project => (
                                    <div key={project.id} className="border p-4 rounded-lg hover:border-blue-500 transition-colors">
                                        <div className="flex justify-between items-center">
                                            <h4 className="font-bold">{project.name}</h4>
                                            {project.alerts > 0 && <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-full animate-pulse">{project.alerts} Alerta</span>}
                                        </div>
                                        <p className="text-sm text-gray-500 mt-2">Progresso: {project.progress}%</p>
                                        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                                            <div className="bg-blue-600 h-2.5 rounded-full" style={{width: `${project.progress}%`}}></div>
                                        </div>
                                    </div>
                                ))}
                             </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}