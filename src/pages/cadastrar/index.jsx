import React from 'react'
import { Header } from '../../components/Header';
import { Container, Column, Title, TitleHighlight, SubtitleLogin, Wrapper, CriarText, EsqueciText, Row } from './styles';
import { TitleLogin } from './styles';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { api } from '../../services/api';
import { MdEmail, MdLock, MdPerson } from 'react-icons/md'





const Cadastrar = () => {
    const navigate = useNavigate()

    const { control, handleSubmit, formState: { errors } } = useForm({
        reValidateMode: 'onChange',
        mode: 'onChange',
    });

    const onSubmit = async (formData) => {
        try {
            const { data } = await api.get(`/users?email=${formData.email}&senha=${formData.senha}`);

            if (data.length && data[0].id) {
                navigate('/feed')
                return
            }

            alert('Usuário ou senha inválido')
        } catch (e) {
            //TODO: HOUVE UM ERRO
        }
    };

    console.log('errors', errors);
    return (
        <>
            <Header />
            <Container>
                <Column >
                    <Title>A plataforma para você aprender com experts, dominar as principais tecnologias
                        e entrar mais rápido nas empresas mais desejadas.</Title>
                </Column>
                <Column>
                    <Wrapper>
                        <TitleLogin> Começe agora gratis </TitleLogin>
                        <SubtitleLogin>Crie sua conta e make the change._</SubtitleLogin>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Input placeholder="Nome Completo" name="Nome" control={control} leftIcon={<MdPerson />} />
                            {errors.Nome && <span>Nome Completo é obrigatório</span>}
                            <Input placeholder="E-mail" name="email" control={control} leftIcon={<MdEmail />} />
                            {errors.email && <span>E-mail é obrigatório</span>}
                            <Input placeholder="Senha" name="senha" type="password" control={control} leftIcon={<MdLock />} />
                            {errors.senha && <span>Senha é obrigatório</span>}
                            <Button title="Criar minha conta" variant="secondary" />
                            <SubtitleLogin>Ao clicar em "Criar minha conta", você concorda com nossos Termos e Política de Privacidade.</SubtitleLogin>
                            <Row>
                                <CriarText>Já tenho uma conta. <EsqueciText href="/login">Fazer Login</EsqueciText> </CriarText>
                            </Row>

                        </form>
                    </Wrapper>
                </Column>
            </Container>
        </>
    )
}

export { Cadastrar };
