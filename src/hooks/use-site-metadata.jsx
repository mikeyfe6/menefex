import { graphql, useStaticQuery } from "gatsby";

const useSiteMetadata = () => {
    const data = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    siteUrl
                    title
                    company

                    bizTel
                    bizEmail

                    author
                    authorImage
                    authorEmail

                    socialHandle

                    image
                    favicon

                    priceImage
                }
            }
        }
    `);
    return data.site.siteMetadata;
};

export default useSiteMetadata;
