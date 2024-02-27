import { QUICK_LINK_FORM_NAMES } from '../../../../widgets/ManageQuickLink/names';
import { createQuickLinkInstance } from './index';

describe('testing createQuickLinkInstance', () => {
  it('should return valid kube object', () => {
    const object = createQuickLinkInstance(QUICK_LINK_FORM_NAMES, {
      name: 'test-component',
      icon: 'PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMzYwIDM2MCI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOm5vbmU7fS5jbHMtMntmaWxsOiNlOTY1NGI7fS5jbHMtM3tmaWxsOiNiNmNmZWE7fS5jbHMtNHtmaWxsOiNlNmY1Zjg7fS5jbHMtNXtmaWxsOiNkMGU4ZjA7fS5jbHMtNntmaWxsOiNlZTc5NGI7fS5jbHMtN3tjbGlwLXBhdGg6dXJsKCNjbGlwLXBhdGgpO30uY2xzLTh7b3BhY2l0eTowLjIyO30uY2xzLTl7ZmlsbDojZTM0ZTNiO30uY2xzLTEwe29wYWNpdHk6MC41O30uY2xzLTExe2ZpbGw6I2ZiZGZjMzt9LmNscy0xMntmaWxsOiMwMTAxMDE7fS5jbHMtMTN7ZmlsbDojZmZmO30uY2xzLTE0e29wYWNpdHk6MC4yNTt9PC9zdHlsZT48Y2xpcFBhdGggaWQ9ImNsaXAtcGF0aCI+PHBvbHlsaW5lIGNsYXNzPSJjbHMtMSIgcG9pbnRzPSIyNDEuMDE5IDExNS42ODcgMjMzLjg0NiAyNzkuNDc5IDEyNi4yNDUgMjc5LjQ3OSAxMjAuMjY3IDExNS42ODciLz48L2NsaXBQYXRoPjwvZGVmcz48dGl0bGU+Y2xvdWRldmVudHMtaWNvbi1jb2xvcjwvdGl0bGU+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNMTIzLjg1NDEsMjUxLjk4MTU2cy0yLjM5MTEyLDcuMTczMzgtNS45Nzc4MSwxMC43NjAwNmExMC44NTM2MSwxMC44NTM2MSwwLDAsMS04LjM2ODk0LDMuNTg2NjhBMTM4LjYwNTg5LDEzOC42MDU4OSwwLDAsMSw5MS41NzM5MSwyNjkuOTE1czguMzY4OTMsMS4xOTU1NywxNy45MzM0NCwyLjM5MTE0YzMuNTg2NjksMCwzLjU4NjY5LDAsNS45Nzc4MiwxLjE5NTU2LDUuOTc3ODEsMCw4LjM2ODkzLTMuNTg2NjgsOC4zNjg5My0zLjU4NjY4WiIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTIzMy44NDU5MSwyNTEuOTgxNTZzMi4zOTExMyw3LjE3MzM4LDUuOTc3ODEsMTAuNzYwMDZhMTAuODUzNjUsMTAuODUzNjUsMCwwLDAsOC4zNjg5NSwzLjU4NjY4LDEzOC42MDYyMSwxMzguNjA2MjEsMCwwLDAsMTcuOTMzNDUsMy41ODY2OHMtOC4zNjksMS4xOTU1Ny0xOS4xMjksMi4zOTExNGMtMy41ODY2NywwLTMuNTg2NjcsMC01Ljk3NzgxLDEuMTk1NTYtNy4xNzMzOCwwLTguMzY5LTMuNTg2NjgtOC4zNjktMy41ODY2OFoiLz48Y2lyY2xlIGNsYXNzPSJjbHMtMyIgY3g9IjE4MC4wNDU1NyIgY3k9IjEzMy42MjA4IiByPSIxMjkuMTIwOCIvPjxjaXJjbGUgY2xhc3M9ImNscy00IiBjeD0iMTgwLjA0NTU3IiBjeT0iMTMzLjYyMDgiIHI9IjEyNC4zMzg1NSIvPjxjaXJjbGUgY2xhc3M9ImNscy01IiBjeD0iMTgwLjA0NTU3IiBjeT0iMTM2LjAxMTk0IiByPSIxMDEuNjIyODUiLz48ZyBpZD0iQm9keSI+PHBhdGggY2xhc3M9ImNscy02IiBkPSJNMTIwLjI2NzQxLDE4My44MzQ0NnM4LjM2ODk0LDEzNS4wOTg2MSw4LjM2ODk0LDEzNy40ODk3NGMwLDEuMTk1NTUsMS4xOTU1NywzLjU4NjY4LTQuNzgyMjUsNS45Nzc4MnMtMjUuMTA2ODIsNy4xNzMzNi0yNS4xMDY4Miw3LjE3MzM2aDI4LjY5MzVjMTMuMTUxMiwwLDEzLjE1MTItMTAuNzYwMDksMTMuMTUxMi0xMy4xNTExOHMzLjU4NjY4LTUzLjgwMDMzLDMuNTg2NjgtNTMuODAwMzMsMS4xOTU1Nyw2MC45NzM2OSwxLjE5NTU3LDYzLjM2NDgzLTEuMTk1NTUsNS45Nzc4MS05LjU2NDUsOC4zNjljLTUuOTc3ODEsMS4xOTU1NC0yMy45MTEyNiw0Ljc4MjI3LTIzLjkxMTI2LDQuNzgyMjdoMjcuNDk3OTRjMTYuNzM3ODgsMCwxNi43Mzc4OC0xMC43NjAwOSwxNi43Mzc4OC0xMC43NjAwOWwzLjU4NjctNTMuODAwMzNzMS4xOTU1Nyw1My44MDAzMywxLjE5NTU3LDU5Ljc3ODE1YzAsNC43ODIyNy0zLjU4NjY4LDguMzY4OTUtMTYuNzM3ODgsMTAuNzYwMDgtOC4zNjksMi4zOTExNC0xOS4xMjksNC43ODIyNy0xOS4xMjksNC43ODIyN2gzMS4wODQ2NGMxNS41NDIzMS0xLjE5NTU0LDE3LjkzMzQ1LTExLjk1NTYzLDE3LjkzMzQ1LTExLjk1NTYzbDI2LjMwMjM5LTEzMy45MDMwNloiLz48cGF0aCBjbGFzcz0iY2xzLTYiIGQ9Ik0yMzkuODIzNzIsMTgzLjgzNDQ2cy04LjM2OSwxMzUuMDk4NjEtOC4zNjksMTM3LjQ4OTc0YzAsMS4xOTU1NS0xLjE5NTU3LDMuNTg2NjgsNC43ODIyNSw1Ljk3NzgyczI1LjEwNjgzLDcuMTczMzYsMjUuMTA2ODMsNy4xNzMzNkgyMzIuNjUwMzRjLTEzLjE1MTIsMC0xMy4xNTEyLTEwLjc2MDA5LTEzLjE1MTItMTMuMTUxMThzLTMuNTg2NjgtNTMuODAwMzMtMy41ODY2OC01My44MDAzMy0xLjE5NTU2LDYwLjk3MzY5LTEuMTk1NTYsNjMuMzY0ODMsMS4xOTU1Niw1Ljk3NzgxLDkuNTY0NDksOC4zNjljNS45Nzc4MSwxLjE5NTU0LDIzLjkxMTI2LDQuNzgyMjcsMjMuOTExMjYsNC43ODIyN0gyMjAuNjk0NzFjLTE2LjczNzg4LDAtMTYuNzM3ODgtMTAuNzYwMDktMTYuNzM3ODgtMTAuNzYwMDlsLTMuNTg2Ny01My44MDAzM3MtMS4xOTU1Nyw1My44MDAzMy0xLjE5NTU3LDU5Ljc3ODE1YzAsNC43ODIyNywzLjU4NjY4LDguMzY4OTUsMTYuNzM3ODgsMTAuNzYwMDgsOC4zNjg5NSwyLjM5MTE0LDE5LjEyOSw0Ljc4MjI3LDE5LjEyOSw0Ljc4MjI3SDIwMy45NTY4MWMtMTUuNTQyMzEtMS4xOTU1NC0xNy45MzM0NC0xMS45NTU2My0xNy45MzM0NC0xMS45NTU2M0wxNTkuNzIxLDIwOC45NDEyOVoiLz48cGF0aCBjbGFzcz0iY2xzLTYiIGQ9Ik0yNDEuMDE5MjcsMTE4LjA3ODVjMCwzMy40NzU3NS0yNy40OTc5NCw1OS43NzgxNC01OS43NzgxNSw1OS43NzgxNFMxMjEuNDYzLDE1MC4zNTg3LDEyMS40NjMsMTE4LjA3ODVzMjcuNDk3OTQtNTkuNzc4MTUsNTkuNzc4MTUtNTkuNzc4MTVTMjQxLjAxOTI3LDg0LjYwMjczLDI0MS4wMTkyNywxMTguMDc4NVoiLz48ZyBjbGFzcz0iY2xzLTciPjxjaXJjbGUgY2xhc3M9ImNscy02IiBjeD0iMTgxLjI0MTEyIiBjeT0iMTUwLjM1ODciIHI9IjEwNi40MDUxIi8+PC9nPjxnIGNsYXNzPSJjbHMtOCI+PHBhdGggY2xhc3M9ImNscy05IiBkPSJNMjM3LjQzMjU5LDE4My44MzQ0NnM3LjE3MzM4LTYzLjM2NDgzLTIuMzkxMTQtODcuMjc2MWMtMTcuOTMzNDQtNDEuODQ0NzEtNTkuNzc4MTUtMzguMjU4LTU5Ljc3ODE1LTM4LjI1OHMyMy45MTEyNiw5LjU2NDUsMjUuMTA2ODMsNDUuNDMxMzljMS4xOTU1NywyNS4xMDY4MiwwLDYyLjE2OTI3LDAsNjIuMTY5MjdaIi8+PC9nPjwvZz48ZyBpZD0iRmFjZSI+PGcgY2xhc3M9ImNscy0xMCI+PGNpcmNsZSBjbGFzcz0iY2xzLTExIiBjeD0iMTU2LjEzNDMxIiBjeT0iODUuNzk4MyIgcj0iOC4zNjg5NCIvPjwvZz48cGF0aCBjbGFzcz0iY2xzLTEyIiBkPSJNMjAxLjU2NTcsMjA3Ljc0NTcyYzAsMjAuMzI0NTgtOS41NjQ1LDMzLjQ3NTc1LTIxLjUyMDEzLDMzLjQ3NTc1cy0yMS41MjAxMi0xNS41NDIzMS0yMS41MjAxMi0zNS44NjY4OWMwLDAsOS41NjQ0OSwxOS4xMjksMjIuNzE1NjksMTkuMTI5UzIwMS41NjU3LDIwNy43NDU3MiwyMDEuNTY1NywyMDcuNzQ1NzJaIi8+PHBhdGggY2xhc3M9ImNscy0xMyIgZD0iTTIwMS41NjU3LDIwNy43NDU3MmMwLDEzLjE1MTItOS41NjQ1LDIwLjMyNDU4LTIxLjUyMDEzLDIwLjMyNDU4UzE1OS43MjEsMjE4LjUwNTc4LDE1OS43MjEsMjA2LjU1MDE1YzAsMCw5LjU2NDUsMTEuOTU1NjMsMjIuNzE1NywxMS45NTU2M1MyMDEuNTY1NywyMDcuNzQ1NzIsMjAxLjU2NTcsMjA3Ljc0NTcyWiIvPjxjaXJjbGUgY2xhc3M9ImNscy0yIiBjeD0iMjIxLjg5MDI4IiBjeT0iMTUxLjU1NDI1IiByPSIzNy4wNjI0NiIvPjxjaXJjbGUgY2xhc3M9ImNscy0yIiBjeD0iMTM4LjIwMDg3IiBjeT0iMTUxLjU1NDI1IiByPSIzNy4wNjI0NiIvPjxjaXJjbGUgY2xhc3M9ImNscy0xMyIgY3g9IjIyMS44OTAyOCIgY3k9IjE1MS41NTQyNSIgcj0iMjguNjkzNTEiLz48Y2lyY2xlIGNsYXNzPSJjbHMtMTMiIGN4PSIxMzUuODA5NzMiIGN5PSIxNTEuNTU0MjUiIHI9IjI4LjY5MzUxIi8+PGNpcmNsZSBjbGFzcz0iY2xzLTEyIiBjeD0iMTM1LjgwOTczIiBjeT0iMTQ3Ljk2NzU3IiByPSI4LjM2ODk1Ii8+PGNpcmNsZSBjbGFzcz0iY2xzLTEyIiBjeD0iMjIxLjg5MDI4IiBjeT0iMTQ3Ljk2NzU3IiByPSI4LjM2ODk1Ii8+PC9nPjxwYXRoIGNsYXNzPSJjbHMtMyIgZD0iTTQ4LjUzMzYzLDE2NS45MDFoMGE1LjY0NzY4LDUuNjQ3NjgsMCwwLDEtNS45Nzc4MS01Ljk3NzgxVjExMi4xMDA2OGE1LjY0NzY3LDUuNjQ3NjcsMCwwLDEsNS45Nzc4MS01Ljk3NzgxaDBhNS42NDc2OCw1LjY0NzY4LDAsMCwxLDUuOTc3ODIsNS45Nzc4MVYxNTkuOTIzMkE1LjY0NzY4LDUuNjQ3NjgsMCwwLDEsNDguNTMzNjMsMTY1LjkwMVoiLz48cGF0aCBjbGFzcz0iY2xzLTMiIGQ9Ik0zMDkuMTY2MzcsMTY1LjkwMWgwYTUuNjQ3NjksNS42NDc2OSwwLDAsMS01Ljk3NzgyLTUuOTc3ODFWMTEyLjEwMDY4YTUuNjQ3NjgsNS42NDc2OCwwLDAsMSw1Ljk3NzgyLTUuOTc3ODFoMGE1LjY0NzY4LDUuNjQ3NjgsMCwwLDEsNS45Nzc4MSw1Ljk3NzgxVjE1OS45MjMyQTUuNjQ3NjgsNS42NDc2OCwwLDAsMSwzMDkuMTY2MzcsMTY1LjkwMVoiLz48Y2lyY2xlIGNsYXNzPSJjbHMtMTMiIGN4PSIxMzkuMzk2NDEiIGN5PSIzNy45NzU3OCIgcj0iNS45Nzc4MSIvPjxwYXRoIGNsYXNzPSJjbHMtMTMiIGQ9Ik05Ni4zNTYxNSwxOTkuMzc2NzdhNC4zOTIxLDQuMzkyMSwwLDAsMS0zLjU4NjY5LTEuMTk1NTdjLTE0LjM0Njc1LTE3LjkzMzQ0LTIxLjUyMDEzLTQwLjY0OTE0LTIxLjUyMDEzLTYzLjM2NDg1QTEwNi42ODM0OCwxMDYuNjgzNDgsMCwwLDEsODUuNTk2MDgsODEuMDE2YTExNy4wMDkxMSwxMTcuMDA5MTEsMCwwLDEsMzguMjU4LTM4LjI1OCw1LjI1NzMxLDUuMjU3MzEsMCwwLDEsNS45Nzc4MywxLjE5NTU3LDUuMjU3MjgsNS4yNTcyOCwwLDAsMS0xLjE5NTU3LDUuOTc3ODFBOTYuNDk2MzQsOTYuNDk2MzQsMCwwLDAsNzkuNjE4MjYsMTMzLjYyMDhhOTQuMjIyMTIsOTQuMjIyMTIsMCwwLDAsMjAuMzI0NTcsNTguNTgyNTljMS4xOTU1NywxLjE5NTU2LDEuMTk1NTcsNC43ODIyNC0xLjE5NTU3LDUuOTc3ODFDOTcuNTUxNzIsMTk5LjM3Njc3LDk3LjU1MTcyLDE5OS4zNzY3Nyw5Ni4zNTYxNSwxOTkuMzc2NzdaIi8+PGcgY2xhc3M9ImNscy0xNCI+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNMjMzLjg0NTkxLDI1NS41NjgyNHYtOS41NjQ1Yy0xNi43Mzc4OCw5LjU2NDUtMzQuNjcxMzIsMTkuMTI5LTU2LjE5MTQ3LDE5LjEyOS0yMy45MTEyNiwwLTM5LjQ1MzU3LTEwLjc2MDA3LTU0Ljk5NTktMTkuMTI5bDEuMTk1NTYsOS41NjQ1czE3LjkzMzQ1LDE5LjEyOSw1NC45OTU5MSwxOS4xMjlDMjEzLjUyMTMzLDI3My41MDE2OCwyMzMuODQ1OTEsMjU1LjU2ODI0LDIzMy44NDU5MSwyNTUuNTY4MjRaIi8+PC9nPjwvc3ZnPg==',
      url: 'https://test-url.com',
      visible: true,
    });

    expect(object).toMatchObject({
      apiVersion: 'v2.edp.epam.com/v1',
      kind: 'QuickLink',
      metadata: { name: 'test-component' },
      spec: {
        type: 'default',
        icon: 'PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMzYwIDM2MCI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOm5vbmU7fS5jbHMtMntmaWxsOiNlOTY1NGI7fS5jbHMtM3tmaWxsOiNiNmNmZWE7fS5jbHMtNHtmaWxsOiNlNmY1Zjg7fS5jbHMtNXtmaWxsOiNkMGU4ZjA7fS5jbHMtNntmaWxsOiNlZTc5NGI7fS5jbHMtN3tjbGlwLXBhdGg6dXJsKCNjbGlwLXBhdGgpO30uY2xzLTh7b3BhY2l0eTowLjIyO30uY2xzLTl7ZmlsbDojZTM0ZTNiO30uY2xzLTEwe29wYWNpdHk6MC41O30uY2xzLTExe2ZpbGw6I2ZiZGZjMzt9LmNscy0xMntmaWxsOiMwMTAxMDE7fS5jbHMtMTN7ZmlsbDojZmZmO30uY2xzLTE0e29wYWNpdHk6MC4yNTt9PC9zdHlsZT48Y2xpcFBhdGggaWQ9ImNsaXAtcGF0aCI+PHBvbHlsaW5lIGNsYXNzPSJjbHMtMSIgcG9pbnRzPSIyNDEuMDE5IDExNS42ODcgMjMzLjg0NiAyNzkuNDc5IDEyNi4yNDUgMjc5LjQ3OSAxMjAuMjY3IDExNS42ODciLz48L2NsaXBQYXRoPjwvZGVmcz48dGl0bGU+Y2xvdWRldmVudHMtaWNvbi1jb2xvcjwvdGl0bGU+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNMTIzLjg1NDEsMjUxLjk4MTU2cy0yLjM5MTEyLDcuMTczMzgtNS45Nzc4MSwxMC43NjAwNmExMC44NTM2MSwxMC44NTM2MSwwLDAsMS04LjM2ODk0LDMuNTg2NjhBMTM4LjYwNTg5LDEzOC42MDU4OSwwLDAsMSw5MS41NzM5MSwyNjkuOTE1czguMzY4OTMsMS4xOTU1NywxNy45MzM0NCwyLjM5MTE0YzMuNTg2NjksMCwzLjU4NjY5LDAsNS45Nzc4MiwxLjE5NTU2LDUuOTc3ODEsMCw4LjM2ODkzLTMuNTg2NjgsOC4zNjg5My0zLjU4NjY4WiIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTIzMy44NDU5MSwyNTEuOTgxNTZzMi4zOTExMyw3LjE3MzM4LDUuOTc3ODEsMTAuNzYwMDZhMTAuODUzNjUsMTAuODUzNjUsMCwwLDAsOC4zNjg5NSwzLjU4NjY4LDEzOC42MDYyMSwxMzguNjA2MjEsMCwwLDAsMTcuOTMzNDUsMy41ODY2OHMtOC4zNjksMS4xOTU1Ny0xOS4xMjksMi4zOTExNGMtMy41ODY2NywwLTMuNTg2NjcsMC01Ljk3NzgxLDEuMTk1NTYtNy4xNzMzOCwwLTguMzY5LTMuNTg2NjgtOC4zNjktMy41ODY2OFoiLz48Y2lyY2xlIGNsYXNzPSJjbHMtMyIgY3g9IjE4MC4wNDU1NyIgY3k9IjEzMy42MjA4IiByPSIxMjkuMTIwOCIvPjxjaXJjbGUgY2xhc3M9ImNscy00IiBjeD0iMTgwLjA0NTU3IiBjeT0iMTMzLjYyMDgiIHI9IjEyNC4zMzg1NSIvPjxjaXJjbGUgY2xhc3M9ImNscy01IiBjeD0iMTgwLjA0NTU3IiBjeT0iMTM2LjAxMTk0IiByPSIxMDEuNjIyODUiLz48ZyBpZD0iQm9keSI+PHBhdGggY2xhc3M9ImNscy02IiBkPSJNMTIwLjI2NzQxLDE4My44MzQ0NnM4LjM2ODk0LDEzNS4wOTg2MSw4LjM2ODk0LDEzNy40ODk3NGMwLDEuMTk1NTUsMS4xOTU1NywzLjU4NjY4LTQuNzgyMjUsNS45Nzc4MnMtMjUuMTA2ODIsNy4xNzMzNi0yNS4xMDY4Miw3LjE3MzM2aDI4LjY5MzVjMTMuMTUxMiwwLDEzLjE1MTItMTAuNzYwMDksMTMuMTUxMi0xMy4xNTExOHMzLjU4NjY4LTUzLjgwMDMzLDMuNTg2NjgtNTMuODAwMzMsMS4xOTU1Nyw2MC45NzM2OSwxLjE5NTU3LDYzLjM2NDgzLTEuMTk1NTUsNS45Nzc4MS05LjU2NDUsOC4zNjljLTUuOTc3ODEsMS4xOTU1NC0yMy45MTEyNiw0Ljc4MjI3LTIzLjkxMTI2LDQuNzgyMjdoMjcuNDk3OTRjMTYuNzM3ODgsMCwxNi43Mzc4OC0xMC43NjAwOSwxNi43Mzc4OC0xMC43NjAwOWwzLjU4NjctNTMuODAwMzNzMS4xOTU1Nyw1My44MDAzMywxLjE5NTU3LDU5Ljc3ODE1YzAsNC43ODIyNy0zLjU4NjY4LDguMzY4OTUtMTYuNzM3ODgsMTAuNzYwMDgtOC4zNjksMi4zOTExNC0xOS4xMjksNC43ODIyNy0xOS4xMjksNC43ODIyN2gzMS4wODQ2NGMxNS41NDIzMS0xLjE5NTU0LDE3LjkzMzQ1LTExLjk1NTYzLDE3LjkzMzQ1LTExLjk1NTYzbDI2LjMwMjM5LTEzMy45MDMwNloiLz48cGF0aCBjbGFzcz0iY2xzLTYiIGQ9Ik0yMzkuODIzNzIsMTgzLjgzNDQ2cy04LjM2OSwxMzUuMDk4NjEtOC4zNjksMTM3LjQ4OTc0YzAsMS4xOTU1NS0xLjE5NTU3LDMuNTg2NjgsNC43ODIyNSw1Ljk3NzgyczI1LjEwNjgzLDcuMTczMzYsMjUuMTA2ODMsNy4xNzMzNkgyMzIuNjUwMzRjLTEzLjE1MTIsMC0xMy4xNTEyLTEwLjc2MDA5LTEzLjE1MTItMTMuMTUxMThzLTMuNTg2NjgtNTMuODAwMzMtMy41ODY2OC01My44MDAzMy0xLjE5NTU2LDYwLjk3MzY5LTEuMTk1NTYsNjMuMzY0ODMsMS4xOTU1Niw1Ljk3NzgxLDkuNTY0NDksOC4zNjljNS45Nzc4MSwxLjE5NTU0LDIzLjkxMTI2LDQuNzgyMjcsMjMuOTExMjYsNC43ODIyN0gyMjAuNjk0NzFjLTE2LjczNzg4LDAtMTYuNzM3ODgtMTAuNzYwMDktMTYuNzM3ODgtMTAuNzYwMDlsLTMuNTg2Ny01My44MDAzM3MtMS4xOTU1Nyw1My44MDAzMy0xLjE5NTU3LDU5Ljc3ODE1YzAsNC43ODIyNywzLjU4NjY4LDguMzY4OTUsMTYuNzM3ODgsMTAuNzYwMDgsOC4zNjg5NSwyLjM5MTE0LDE5LjEyOSw0Ljc4MjI3LDE5LjEyOSw0Ljc4MjI3SDIwMy45NTY4MWMtMTUuNTQyMzEtMS4xOTU1NC0xNy45MzM0NC0xMS45NTU2My0xNy45MzM0NC0xMS45NTU2M0wxNTkuNzIxLDIwOC45NDEyOVoiLz48cGF0aCBjbGFzcz0iY2xzLTYiIGQ9Ik0yNDEuMDE5MjcsMTE4LjA3ODVjMCwzMy40NzU3NS0yNy40OTc5NCw1OS43NzgxNC01OS43NzgxNSw1OS43NzgxNFMxMjEuNDYzLDE1MC4zNTg3LDEyMS40NjMsMTE4LjA3ODVzMjcuNDk3OTQtNTkuNzc4MTUsNTkuNzc4MTUtNTkuNzc4MTVTMjQxLjAxOTI3LDg0LjYwMjczLDI0MS4wMTkyNywxMTguMDc4NVoiLz48ZyBjbGFzcz0iY2xzLTciPjxjaXJjbGUgY2xhc3M9ImNscy02IiBjeD0iMTgxLjI0MTEyIiBjeT0iMTUwLjM1ODciIHI9IjEwNi40MDUxIi8+PC9nPjxnIGNsYXNzPSJjbHMtOCI+PHBhdGggY2xhc3M9ImNscy05IiBkPSJNMjM3LjQzMjU5LDE4My44MzQ0NnM3LjE3MzM4LTYzLjM2NDgzLTIuMzkxMTQtODcuMjc2MWMtMTcuOTMzNDQtNDEuODQ0NzEtNTkuNzc4MTUtMzguMjU4LTU5Ljc3ODE1LTM4LjI1OHMyMy45MTEyNiw5LjU2NDUsMjUuMTA2ODMsNDUuNDMxMzljMS4xOTU1NywyNS4xMDY4MiwwLDYyLjE2OTI3LDAsNjIuMTY5MjdaIi8+PC9nPjwvZz48ZyBpZD0iRmFjZSI+PGcgY2xhc3M9ImNscy0xMCI+PGNpcmNsZSBjbGFzcz0iY2xzLTExIiBjeD0iMTU2LjEzNDMxIiBjeT0iODUuNzk4MyIgcj0iOC4zNjg5NCIvPjwvZz48cGF0aCBjbGFzcz0iY2xzLTEyIiBkPSJNMjAxLjU2NTcsMjA3Ljc0NTcyYzAsMjAuMzI0NTgtOS41NjQ1LDMzLjQ3NTc1LTIxLjUyMDEzLDMzLjQ3NTc1cy0yMS41MjAxMi0xNS41NDIzMS0yMS41MjAxMi0zNS44NjY4OWMwLDAsOS41NjQ0OSwxOS4xMjksMjIuNzE1NjksMTkuMTI5UzIwMS41NjU3LDIwNy43NDU3MiwyMDEuNTY1NywyMDcuNzQ1NzJaIi8+PHBhdGggY2xhc3M9ImNscy0xMyIgZD0iTTIwMS41NjU3LDIwNy43NDU3MmMwLDEzLjE1MTItOS41NjQ1LDIwLjMyNDU4LTIxLjUyMDEzLDIwLjMyNDU4UzE1OS43MjEsMjE4LjUwNTc4LDE1OS43MjEsMjA2LjU1MDE1YzAsMCw5LjU2NDUsMTEuOTU1NjMsMjIuNzE1NywxMS45NTU2M1MyMDEuNTY1NywyMDcuNzQ1NzIsMjAxLjU2NTcsMjA3Ljc0NTcyWiIvPjxjaXJjbGUgY2xhc3M9ImNscy0yIiBjeD0iMjIxLjg5MDI4IiBjeT0iMTUxLjU1NDI1IiByPSIzNy4wNjI0NiIvPjxjaXJjbGUgY2xhc3M9ImNscy0yIiBjeD0iMTM4LjIwMDg3IiBjeT0iMTUxLjU1NDI1IiByPSIzNy4wNjI0NiIvPjxjaXJjbGUgY2xhc3M9ImNscy0xMyIgY3g9IjIyMS44OTAyOCIgY3k9IjE1MS41NTQyNSIgcj0iMjguNjkzNTEiLz48Y2lyY2xlIGNsYXNzPSJjbHMtMTMiIGN4PSIxMzUuODA5NzMiIGN5PSIxNTEuNTU0MjUiIHI9IjI4LjY5MzUxIi8+PGNpcmNsZSBjbGFzcz0iY2xzLTEyIiBjeD0iMTM1LjgwOTczIiBjeT0iMTQ3Ljk2NzU3IiByPSI4LjM2ODk1Ii8+PGNpcmNsZSBjbGFzcz0iY2xzLTEyIiBjeD0iMjIxLjg5MDI4IiBjeT0iMTQ3Ljk2NzU3IiByPSI4LjM2ODk1Ii8+PC9nPjxwYXRoIGNsYXNzPSJjbHMtMyIgZD0iTTQ4LjUzMzYzLDE2NS45MDFoMGE1LjY0NzY4LDUuNjQ3NjgsMCwwLDEtNS45Nzc4MS01Ljk3NzgxVjExMi4xMDA2OGE1LjY0NzY3LDUuNjQ3NjcsMCwwLDEsNS45Nzc4MS01Ljk3NzgxaDBhNS42NDc2OCw1LjY0NzY4LDAsMCwxLDUuOTc3ODIsNS45Nzc4MVYxNTkuOTIzMkE1LjY0NzY4LDUuNjQ3NjgsMCwwLDEsNDguNTMzNjMsMTY1LjkwMVoiLz48cGF0aCBjbGFzcz0iY2xzLTMiIGQ9Ik0zMDkuMTY2MzcsMTY1LjkwMWgwYTUuNjQ3NjksNS42NDc2OSwwLDAsMS01Ljk3NzgyLTUuOTc3ODFWMTEyLjEwMDY4YTUuNjQ3NjgsNS42NDc2OCwwLDAsMSw1Ljk3NzgyLTUuOTc3ODFoMGE1LjY0NzY4LDUuNjQ3NjgsMCwwLDEsNS45Nzc4MSw1Ljk3NzgxVjE1OS45MjMyQTUuNjQ3NjgsNS42NDc2OCwwLDAsMSwzMDkuMTY2MzcsMTY1LjkwMVoiLz48Y2lyY2xlIGNsYXNzPSJjbHMtMTMiIGN4PSIxMzkuMzk2NDEiIGN5PSIzNy45NzU3OCIgcj0iNS45Nzc4MSIvPjxwYXRoIGNsYXNzPSJjbHMtMTMiIGQ9Ik05Ni4zNTYxNSwxOTkuMzc2NzdhNC4zOTIxLDQuMzkyMSwwLDAsMS0zLjU4NjY5LTEuMTk1NTdjLTE0LjM0Njc1LTE3LjkzMzQ0LTIxLjUyMDEzLTQwLjY0OTE0LTIxLjUyMDEzLTYzLjM2NDg1QTEwNi42ODM0OCwxMDYuNjgzNDgsMCwwLDEsODUuNTk2MDgsODEuMDE2YTExNy4wMDkxMSwxMTcuMDA5MTEsMCwwLDEsMzguMjU4LTM4LjI1OCw1LjI1NzMxLDUuMjU3MzEsMCwwLDEsNS45Nzc4MywxLjE5NTU3LDUuMjU3MjgsNS4yNTcyOCwwLDAsMS0xLjE5NTU3LDUuOTc3ODFBOTYuNDk2MzQsOTYuNDk2MzQsMCwwLDAsNzkuNjE4MjYsMTMzLjYyMDhhOTQuMjIyMTIsOTQuMjIyMTIsMCwwLDAsMjAuMzI0NTcsNTguNTgyNTljMS4xOTU1NywxLjE5NTU2LDEuMTk1NTcsNC43ODIyNC0xLjE5NTU3LDUuOTc3ODFDOTcuNTUxNzIsMTk5LjM3Njc3LDk3LjU1MTcyLDE5OS4zNzY3Nyw5Ni4zNTYxNSwxOTkuMzc2NzdaIi8+PGcgY2xhc3M9ImNscy0xNCI+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNMjMzLjg0NTkxLDI1NS41NjgyNHYtOS41NjQ1Yy0xNi43Mzc4OCw5LjU2NDUtMzQuNjcxMzIsMTkuMTI5LTU2LjE5MTQ3LDE5LjEyOS0yMy45MTEyNiwwLTM5LjQ1MzU3LTEwLjc2MDA3LTU0Ljk5NTktMTkuMTI5bDEuMTk1NTYsOS41NjQ1czE3LjkzMzQ1LDE5LjEyOSw1NC45OTU5MSwxOS4xMjlDMjEzLjUyMTMzLDI3My41MDE2OCwyMzMuODQ1OTEsMjU1LjU2ODI0LDIzMy44NDU5MSwyNTUuNTY4MjRaIi8+PC9nPjwvc3ZnPg==',
        url: 'https://test-url.com',
        visible: true,
      },
    });
  });
});
