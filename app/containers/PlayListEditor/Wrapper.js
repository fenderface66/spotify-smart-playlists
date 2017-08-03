import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 12px;
  .genre-container {
    overflow-y: scroll;
    max-height: 300px;
  }
`;

export default Wrapper;
