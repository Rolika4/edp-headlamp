import { Icon } from '@iconify/react';
import { Router } from '@kinvolk/headlamp-plugin/lib';
import { Button, Grid, Typography } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { EmptyList } from '../../components/EmptyList';
import { LearnMoreLink } from '../../components/LearnMoreLink';
import { PageWrapper } from '../../components/PageWrapper';
import { Section } from '../../components/Section';
import { CODEBASE_TYPES } from '../../constants/codebaseTypes';
import { EDP_USER_GUIDE } from '../../constants/urls';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { EDPCDPipelineKubeObject } from '../../k8s/EDPCDPipeline';
import { useCodebasesByTypeLabelQuery } from '../../k8s/EDPCodebase/hooks/useCodebasesByTypeLabelQuery';
import { CODEBASE_LABEL_SELECTOR_CODEBASE_TYPE_SYSTEM_TYPE } from '../../k8s/EDPCodebase/labels';
import { useDialogContext } from '../../providers/Dialog/hooks';
import { Filter } from '../../providers/Filter/components/Filter';
import { NamespaceControl } from '../../providers/Filter/components/Filter/components/NamespaceControl';
import { SearchControl } from '../../providers/Filter/components/Filter/components/SearchControl';
import { useFilterContext } from '../../providers/Filter/hooks';
import { ResourceActionListContextProvider } from '../../providers/ResourceActionList';
import { FORM_MODES } from '../../types/forms';
import { getDefaultNamespace } from '../../utils/getDefaultNamespace';
import { CREATE_EDIT_CD_PIPELINE_DIALOG_NAME } from '../../widgets/CreateEditCDPipeline/constants';
import { CreateEditCDPipelineDialogForwardedProps } from '../../widgets/CreateEditCDPipeline/types';
import { routeEDPGitOpsConfiguration } from '../edp-configuration/pages/edp-gitops/route';
import { CDPipelineActions } from './components/CDPipelineActions';
import { CDPipelineList } from './components/CDPipelineList';

export const PageView = () => {
  const { data: gitOpsCodebase, isLoading } = useCodebasesByTypeLabelQuery({
    props: {
      namespace: getDefaultNamespace(),
      codebaseType: CODEBASE_TYPES.SYSTEM,
    },
    options: {
      select: (data) => {
        return data?.items.find(
          (el) => el.metadata.labels[CODEBASE_LABEL_SELECTOR_CODEBASE_TYPE_SYSTEM_TYPE] === 'gitops'
        );
      },
    },
  });

  const [items, error] = EDPCDPipelineKubeObject.useList();

  const { setDialog } = useDialogContext();

  const createEditCDPipelineDialogForwardedProps: CreateEditCDPipelineDialogForwardedProps =
    React.useMemo(() => ({ mode: FORM_MODES.CREATE }), []);

  const history = useHistory();

  const gitOpsConfigurationPageRoute = Router.createRouteURL(routeEDPGitOpsConfiguration.path);

  const { filterFunction } = useFilterContext();

  return (
    <PageWrapper>
      <Section
        title={
          <Grid container alignItems={'center'} spacing={1}>
            <Grid item>
              <Typography variant={'h1'}>Environments</Typography>
            </Grid>
          </Grid>
        }
        description={
          <>
            Manage your environments with deployed applications.{' '}
            <LearnMoreLink url={EDP_USER_GUIDE.CD_PIPELINE_CREATE.anchors.CREATE_VIA_UI.url} />
          </>
        }
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2} alignItems={'flex-end'} justifyContent={'flex-end'}>
              <Grid item flexGrow={1}>
                <Filter
                  controls={{
                    namespace: {
                      component: <NamespaceControl />,
                    },
                    search: {
                      component: <SearchControl />,
                    },
                  }}
                />
              </Grid>
              <Grid item>
                <Button
                  startIcon={<Icon icon={ICONS.PLUS} />}
                  color={'primary'}
                  variant={'contained'}
                  onClick={() =>
                    setDialog({
                      modalName: CREATE_EDIT_CD_PIPELINE_DIALOG_NAME,
                      forwardedProps: createEditCDPipelineDialogForwardedProps,
                    })
                  }
                  disabled={!gitOpsCodebase}
                >
                  create environment
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <ResourceActionListContextProvider>
              {(isLoading || !!gitOpsCodebase) && (
                <CDPipelineList CDPipelines={items} error={error} filterFunction={filterFunction} />
              )}
              {!isLoading && !gitOpsCodebase && (
                <EmptyList
                  customText={'No GitOps repository configured.'}
                  linkText={'Click here to add a repository.'}
                  handleClick={() => history.push(gitOpsConfigurationPageRoute)}
                />
              )}
              <CDPipelineActions />
            </ResourceActionListContextProvider>
          </Grid>
        </Grid>
      </Section>
    </PageWrapper>
  );
};
