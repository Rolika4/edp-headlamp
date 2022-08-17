import { useFormContext } from 'react-hook-form';
import { MuiCore, React } from '../../../../../../../plugin.globals';
import { capitalizeFirstLetter } from '../../../../../../../utils/format/capitalizeFirstLetter';
import { FormRadio } from '../../../../../../FormComponents/FormRadio';
import { FormRadioOption } from '../../../../../../FormComponents/FormRadio/types';
import { useChosenCodebaseLanguage } from '../../../hooks/useChosenCodebaseLanguage';
import { getRecommendedJenkinsAgent } from '../../../utils';
import { FrameworkProps } from './types';

const { Grid } = MuiCore;

const LangFrameworkImage = ({ src }: { src: string }): React.ReactElement => {
    return <img src={src} alt={''} width={20} height={20} style={{ objectFit: 'contain' }} />;
};

const getIconSrc = (icon: string) => {
    try {
        return require(`../../../../../../../assets/applications/${icon}`).default;
    } catch (e) {
        console.error(`Couldn't find an icon in ../../../../../../../assets/applications/${icon}`);
    }
};

export const Framework = ({ names, handleFormFieldChange, type }: FrameworkProps) => {
    const {
        register,
        control,
        formState: { errors },
        setValue,
        watch,
    } = useFormContext();

    const capitalizedCodebaseType = capitalizeFirstLetter(type);

    const buildToolValue = watch(names.buildTool.name);
    const langValue = watch(names.lang.name);

    const onFrameworkChange = React.useCallback(
        event => {
            handleFormFieldChange(event);
            const recommendedJenkinsAgent = getRecommendedJenkinsAgent(type, {
                lang: langValue,
                framework: event.target.value,
                buildTool: buildToolValue,
            });
            setValue(names.jenkinsSlave.name, recommendedJenkinsAgent);
            handleFormFieldChange({
                target: {
                    name: names.jenkinsSlave.name,
                    value: recommendedJenkinsAgent,
                },
            });
        },
        [buildToolValue, handleFormFieldChange, langValue, names.jenkinsSlave.name, setValue, type]
    );

    const { chosenLang } = useChosenCodebaseLanguage({ watch, names, type });

    return (
        <Grid item xs={12}>
            <FormRadio
                {...register(names.framework.name, {
                    onChange: onFrameworkChange,
                })}
                control={control}
                errors={errors}
                label={`${capitalizedCodebaseType} Code Framework`}
                title={`Select ${type} language/framework and build tool.`}
                options={Object.values(chosenLang.frameworks).map(({ name, value, icon }) => {
                    const src = getIconSrc(String(icon));
                    return {
                        value,
                        label: name,
                        icon: <LangFrameworkImage src={src} />,
                        checkedIcon: <LangFrameworkImage src={src} />,
                    } as FormRadioOption;
                })}
            />
        </Grid>
    );
};
