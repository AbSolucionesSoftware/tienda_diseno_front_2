import React, { useCallback, useContext, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import Navegacion from '../../components/Navegacion/Navegacion';
/* import Categorias from '../Categorias/Categorias'; */
import FooterPage from '../../components/Footer/Footer';
import './layout.scss';
import { MenuContext } from '../../context/carritoContext';
import clienteAxios from '../../config/axios';
import jwt_decode from 'jwt-decode';

export default function LayoutBasic(props) {
	const { routes } = props;
	const { Content, Footer } = Layout;
	const token = localStorage.getItem('token'); 
	var decoded = { _id: '' };
	const { setDatosContx, setLoading, active } = useContext(MenuContext);
	
	if (token !== null) decoded = Jwt(token);;

	function Jwt(token) {
		try {
			return jwt_decode(token);
		} catch (e) {
			return null;
		}
	}

	const obtenerInformacionTienda = useCallback(
		async () => {
			setLoading(true);
			await clienteAxios
			.get(`/home/${decoded._id ? decoded._id : null}`, {
				headers: {
					Authorization: `bearer ${token}`
				}
			})
			.then((res) => {
				setDatosContx(res.data);
				setLoading(false);
			})
			.catch((res) => {
				console.log(res);
				setLoading(false);
			});
		},
		[ decoded._id, token, setDatosContx, setLoading ],
	)

	useEffect(() => {
		obtenerInformacionTienda();
	}, [ obtenerInformacionTienda, active ])

	return (
		<div className="body">
			<Layout>
				<div className="cuerpo bg-layout">
					<Layout>
						<Navegacion />
						{/* <Categorias /> */}
						<Content style={{ height: 'auto' }} className="bg-layout">
							<div className="site-layout-content flex">
								<LoadRoutes routes={routes} />
							</div>
						</Content>
					</Layout>
				</div>
				<Footer className="foot" style={{ margin: 0, padding: 0 }}>
					<FooterPage style={{ margin: 0, padding: 0 }} />
				</Footer>
			</Layout>
		</div>
	);
}

function LoadRoutes({ routes }) {
	return (
		<Switch>
			{routes.map((route, index) => (
				<Route key={index} path={route.path} exact={route.exact} component={route.component} />
			))}
		</Switch>
	);
}
