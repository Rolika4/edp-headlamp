import { Grid } from '@mui/material';
import React from 'react';
import { PageWrapper } from '../../components/PageWrapper';
import { Section } from '../../components/Section';
import { CDPipelinesGraph } from './components/CDPipelinesGraph';
import { CodebaseBranchesGraph } from './components/CodebaseBranchesGraph';
import { CodebasesGraph } from './components/CodebasesGraph';
import { ComponentList } from './components/ComponentList';
import { PipelineRunListWithFilter } from './components/PipelineRunList';
import { PipelineRunsGraph } from './components/PipelineRunsGraph';
import { QuickLinkActions } from './components/QuickLinkActions';
import { StagesGraph } from './components/StagesGraph';

export const PageView = () => {
  return (
    <PageWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Section
            title={'Overview'}
            description={
              'Gain essential information on your codebase insights. Organize your menu for faster and more convenient access to different parts of the portal.'
            }
          >
            <Grid container spacing={3}>
              <Grid item xs={6} sm={4} lg={3} xl={4}>
                <CodebasesGraph />
              </Grid>
              <Grid item xs={6} sm={4} lg={3} xl={4}>
                <CodebaseBranchesGraph />
              </Grid>
              <Grid item xs={6} sm={4} lg={3} xl={4}>
                <PipelineRunsGraph />
              </Grid>
              <Grid item xs={6} sm={4} lg={3} xl={4}>
                <CDPipelinesGraph />
              </Grid>
              <Grid item xs={6} sm={4} lg={3} xl={4}>
                <StagesGraph />
              </Grid>
            </Grid>
          </Section>
        </Grid>
        <Grid item xs={12}>
          <Section
            title={'Links'}
            description={'A set of icons with links that redirect you to corresponding tools.'}
          >
            <ComponentList />
            <QuickLinkActions />
          </Section>
        </Grid>
        <Grid item xs={12}>
          <Section
            title={'Pipelines'}
            description={
              'Monitor the progress of overall pipeline runs launched within the platform.'
            }
          >
            <PipelineRunListWithFilter />
          </Section>
        </Grid>
      </Grid>
    </PageWrapper>
  );
};
