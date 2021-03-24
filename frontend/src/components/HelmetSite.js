import { Helmet } from 'react-helmet';

const HelmetSite = ({ title }) => {
    return (
        <Helmet>
            <title>{title} | {process.env.REACT_APP_NAME}</title>
        </Helmet>
    )
}
export default HelmetSite;