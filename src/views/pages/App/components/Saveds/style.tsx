import styled from 'styled-components'

export const Grid = styled.div`
   position: relative;
   display: flex;
   flex-direction: column;
   gap: 18px;
   padding: 50px 28px 50px 28px;
`

export const Card = styled.div`
   width: 100%;
   height: 120px;
   box-shadow: 1px 1px 4px 1px #0000007f;
   display: flex;
   flex-direction: column;
   gap: 8px;
   padding: 4px 8px;
`

export const CardTitle = styled.h3`
   width: 100%;
   font-weight: 300;
   font-size: 22px;
   text-overflow: ellipsis;
   overflow: hidden;
   white-space: nowrap;
`

export const CardLine = styled.p`
   width: 100%;
   font-weight: 300;
   font-size: 18px;
   text-overflow: ellipsis;
   overflow: hidden;
   white-space: nowrap;
`

export const Spinner = styled.div`
   position: fixed;
   top: 50%;
   left: 50%;
   translate: -50%;
   height: 50px;
   width: 50px;
   svg {
      animation: is-rotating 1s linear infinite;
      width: 40px;
      height: 40px;
      fill: #0000007f;
   }

   @keyframes is-rotating {
      to {
         transform: rotate(360deg);
      }
   }
`
