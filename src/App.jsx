import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { createGlobalStyle } from 'styled-components';
import { addContact, removeContact, editContact } from './store/contactsSlice';

const GlobalStyle = createGlobalStyle`
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: Arial, sans-serif;
    background: linear-gradient(135deg, #0f172a, #1d4ed8);
    color: #f8fafc;
  }
  button, input { font: inherit; }
`;

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
`;

const Card = styled.div`
  width: min(900px, 100%);
  background: rgba(15, 23, 42, 0.88);
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.35);
`;

const Title = styled.h1`
  margin: 0 0 8px;
  font-size: 2rem;
`;

const Subtitle = styled.p`
  margin: 0 0 24px;
  color: #cbd5e1;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 24px;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const Input = styled.input`
  border: 1px solid #334155;
  border-radius: 10px;
  padding: 12px;
  background: #020617;
  color: #f8fafc;
`;

const Button = styled.button`
  border: none;
  border-radius: 10px;
  padding: 12px 16px;
  cursor: pointer;
  background: #3b82f6;
  color: white;
  font-weight: 600;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 12px;
`;

const ContactItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #111827;
  border-radius: 14px;
  padding: 14px 16px;
  gap: 12px;

  @media (max-width: 700px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  border: none;
  border-radius: 8px;
  padding: 8px 10px;
  cursor: pointer;
  background: ${(props) => (props.$danger ? '#ef4444' : '#64748b')};
  color: white;
`;

function App() {
  const contacts = useSelector((state) => state.contacts.contacts);
  const dispatch = useDispatch();
  const [form, setForm] = useState({ fullName: '', email: '', phone: '' });
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.fullName || !form.email || !form.phone) return;

    if (editingId) {
      dispatch(editContact({ id: editingId, ...form }));
      setEditingId(null);
    } else {
      dispatch(addContact(form));
    }

    setForm({ fullName: '', email: '', phone: '' });
  };

  const handleEdit = (contact) => {
    setEditingId(contact.id);
    setForm({ fullName: contact.fullName, email: contact.email, phone: contact.phone });
  };

  return (
    <>
      <GlobalStyle />
      <Page>
        <Card>
          <Title>Lista de contatos</Title>
          <Subtitle>Adicione, edite e remova contatos com Redux e Styled Components.</Subtitle>

          <Form onSubmit={handleSubmit}>
            <Input
              placeholder="Nome completo"
              value={form.fullName}
              onChange={(event) => setForm({ ...form, fullName: event.target.value })}
            />
            <Input
              placeholder="E-mail"
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
            />
            <Input
              placeholder="Telefone"
              value={form.phone}
              onChange={(event) => setForm({ ...form, phone: event.target.value })}
            />
            <Button type="submit">{editingId ? 'Salvar edição' : 'Adicionar contato'}</Button>
          </Form>

          <List>
            {contacts.map((contact) => (
              <ContactItem key={contact.id}>
                <div>
                  <strong>{contact.fullName}</strong>
                  <div>{contact.email}</div>
                  <div>{contact.phone}</div>
                </div>
                <Actions>
                  <ActionButton onClick={() => handleEdit(contact)}>Editar</ActionButton>
                  <ActionButton $danger onClick={() => dispatch(removeContact(contact.id))}>
                    Remover
                  </ActionButton>
                </Actions>
              </ContactItem>
            ))}
          </List>
        </Card>
      </Page>
    </>
  );
}

export default App;
