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
                <li><a href="/"><i className="material-icons">store</i>Home</a></li>
                <li><a href="#!" className="brand-logo"><i className="material-icons">account_box</i>Admin</a></li>
                <li><a href="/admin/product"><i className="material-icons">storage</i>Produtos</a></li>
                <li><a href="/admin/client"><i className="material-icons">people</i>Clientes</a></li>
                <li className="divider"></li>
                <li><a href="#!"><i className="material-icons">exit_to_app</i>Sair</a></li>
            </ul>
            <a href="#!" data-target="slide-out" className="sidenav-trigger show-on-large">
                {/* <i className="material-icons">menu</i> */}
                <img 
                    src="/assets/icons/logo.png" 
                    alt="menu" 
                    style={{ width: '10%', height: 'auto' }} // ajuste o tamanho conforme necessário
                />
            </a>
        </div>
    );
};

export default Sidebar2;
