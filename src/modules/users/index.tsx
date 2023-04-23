import { useState } from "react";
import userApi from "./state/apiSlice"

export default function Users() {
    const [isName, setIsName] = useState('')
    const [isEmail, setIsEmail] = useState('')

    const { data: listUsers, refetch, isError, isSuccess } = userApi.useGetUsersQuery();
    const [addUser, { isLoading: isLoadingAddUserData }] = userApi.useAddUserMutation();
    const [deleteUser] = userApi.useDeleteUserMutation();

    const handleClickCreateUser = () => {
        if (isName?.length === 0 || isEmail?.length === 0) return

        addUser({
            id: Math.ceil(Math.random() * 100),
            name: isName,
            username: isName,
            email: isEmail
        })
        setIsName('')
        setIsEmail('')
    }

    const handleClickDeleteUser = (id: number) => {
        deleteUser(id)
    }

    const handleReFetch = () => {
        refetch()
    }

    if (isError) {
        return (
            <p>Não foi possível retornar sua listagem</p>
        )
    }

    return (
        <div>
            <h4>Usuários</h4>
            <div>
                <input
                    name='name'
                    placeholder="digite seu nome"
                    type='text'
                    onChange={(e) => setIsName(e.target.value)}
                    value={isName}
                />
                <br />
                <br />
                <input
                    name='email'
                    placeholder="digite seu email"
                    type='email'
                    onChange={(e) => setIsEmail(e.target.value)}
                    value={isEmail}
                />
                <br />
                <br />
                <button
                    style={{ height: '36px', background: '#afacac', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    onClick={handleClickCreateUser}
                >
                    criar usuário
                </button>
                {isLoadingAddUserData && <p>Criando usuário ...</p>}
            </div>
            {isSuccess && (
                <div>
                    {listUsers?.map((item) => (
                        <div
                            key={item.id}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#ebeaea', marginTop: '16px', padding: '8px', width: '300px' }}
                        >
                            <div >
                                <p>
                                    <span>Nome: </span>
                                    {item.name}
                                </p>
                                <p>
                                    <span>UserName: </span>
                                    {item.username}
                                </p>
                            </div>
                            <button
                                style={{ height: '36px', background: '#afacac', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                onClick={() => handleClickDeleteUser(item.id)}
                            >
                                deletar
                            </button>
                        </div>
                    ))}
                </div>
            )}
            <button onClick={handleReFetch}>force re-fetch</button>

        </div>
    )
}
