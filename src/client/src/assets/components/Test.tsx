import { useTranslation } from 'react-i18next';

const TextComponent = () => {
    const { t } = useTranslation();

    return (
        <div>
        <p>{t('description')}</p>
        </div>
    );
};

export default TextComponent;
