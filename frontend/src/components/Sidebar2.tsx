import React, { useEffect, useState } from 'react';
import M from 'materialize-css';

interface SidebarProps {
    onToggle: (isOpen: boolean) => void;
}

const Sidebar2: React.FC<SidebarProps> = ({ onToggle }) => {

    useEffect(() => {
        // Inicializando o Sidenav
        const sidenav = M.Sidenav.init(document.querySelectorAll('.sidenav'), {
            onOpenStart: () => onToggle(true),
            onCloseEnd: () => onToggle(false)
        });
        
        return () => {
            // Destruir a instância ao desmontar o componente
            sidenav[0].destroy();
        };
    }, [onToggle]);

    return (
        <div>
            <ul id="slide-out" className="sidenav">
                <li><a href="/">Home</a></li>
                <li><a href="#!" className="brand-logo">Admin</a></li>
                <li><a href="/admin/product">Produtos</a></li>
                <li><a href="/admin/client">Clientes</a></li>
                <li className="divider"></li>
                <li><a href="#!">Sair</a></li>
            </ul>
            <a href="#!" data-target="slide-out" className="sidenav-trigger show-on-large">
                <i className="material-icons">menu</i>
            </a>
        </div>
    );
};

export default Sidebar2;
