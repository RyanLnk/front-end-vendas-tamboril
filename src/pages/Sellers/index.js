import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import ButtonAdd from '../../components/ButtonAdd';
import ButtonRemove from '../../components/ButtonRemove';

const Sellers = () => {
  const navigate = useNavigate();
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    async function getSellers() {
      const response = await axios.get('https://localhost:7097/sellers');
      setSellers(response.data);
    }
    getSellers();
  }, []);

  async function deleteSeller(id) {
    await axios.delete(`https://localhost:7097/sellers/${id}`);
    setSellers(sellers.filter((seller) => seller.id !== id));
  }

  function add() {
    navigate('/sellersform');
  }

  if (sellers.length !== 0) {
    return (
      <>
        <h1 className="ml-4 text-2xl font-bold">Vendedores</h1>

        <ButtonAdd add={add} />

        <table className="m-5 w-5/6 mx-auto table-auto">
          <thead>
            <tr className="text-left border-b border-gray-300">
              <th className="px-4 py-1">Nome</th>
              <th className="px-4 py-1">Opções</th>
            </tr>
          </thead>

          <tbody>
            {sellers.map((seller) => (
              <tr
                className="border-b border-gray-200 hover:bg-gray-100"
                key={seller.id}
              >
                <td className="px-4 py-2">{seller.name}</td>
                <td className="px-4 py-2 inline-flex">
                  {
                    <Link
                      className="text-indigo-800 hover:text-indigo-200 hover:scale-125 active:scale-95 ease-in-out duration-100"
                      to={`/sellersform/${seller.id}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </Link>
                  }
                  <ButtonRemove
                    deleteFunction={deleteSeller}
                    parameter={seller.id}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  } else {
    return (
      <>
        <h1 className="ml-4 text-2xl font-bold">Vendedores</h1>

        <div>
          <ButtonAdd add={add} />
        </div>

        <p className="ml-4">Carregando...</p>
      </>
    );
  }
};

export default Sellers;
