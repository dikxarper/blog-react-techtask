import './App.css'
import { Layout } from 'antd';

const { Header, Content, Footer } = Layout;

const App = () => {
    return (
        <Layout>
            <Header>
                <img src="/logo.png" alt="" />
            </Header>
            <Content>
                
            </Content>
            <Footer>
                techTask ©{new Date().getFullYear()} Created by dikxarper
            </Footer>
        </Layout>
    )
}

export default App
