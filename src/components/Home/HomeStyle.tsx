import styled from 'styled-components';

const HomeStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .card {
    flex: 0 1 49%;
    margin-bottom: 5px;
    text-align: center;
    cursor: pointer;

    [class*="MuiTypography-root"]{
      overflow-x: auto;
    }

    .iconDiv {
      height: 40px;
      text-align: center;
    }

    .cardHeader {
      padding-top: 0;
      
      div {
        width: 100%;
      }
    }
  }
`;

export default HomeStyle;
