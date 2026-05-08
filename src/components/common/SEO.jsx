import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, canonical, type = 'website' }) => {
    const siteName = 'PrintsBasket';
    const fullTitle = title ? `${title} | ${siteName}` : `${siteName} - Buy Affordable Printers, Ink & Toner Cartridges Online`;

    return (
        <Helmet>
            <title>{fullTitle}</title>
            {description && <meta name="description" content={description} />}
            {canonical && <link rel="canonical" href={`https://www.printsbasket.com${canonical}`} />}
            <meta property="og:title" content={fullTitle} />
            {description && <meta property="og:description" content={description} />}
            <meta property="og:type" content={type} />
            {canonical && <meta property="og:url" content={`https://www.printsbasket.com${canonical}`} />}
            <meta name="twitter:title" content={fullTitle} />
            {description && <meta name="twitter:description" content={description} />}
        </Helmet>
    );
};

export default SEO;
