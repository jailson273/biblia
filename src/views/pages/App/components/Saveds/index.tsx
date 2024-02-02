import { useDb } from '@biblia/views/common/hooks/useDb'
import * as Style from './style'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Saved } from '@biblia/services/db/interfaces/IDb'
import LoadIcon from '@biblia/views/common/components/Icon/LoadIcon'
import { format } from 'date-fns'

export default function Saveds() {
   const { db } = useDb()
   const [saveds, setSaveds] = useState<Saved[]>([])
   const [isLoadingSaveds, setIsLoadingSaveds] = useState(false)

   const savedRender = useMemo(() => {
      if (saveds?.length > 0) {
         return saveds.map(saved => (
            <Style.Card key={saved.id}>
               <Style.CardTitle>{saved.name || 'Marcado'}</Style.CardTitle>
               <Style.CardLine>
                  {saved.verses[0].bookName}, capitulo {saved.verses[0].chapter}{' '}
               </Style.CardLine>
               <Style.CardLine>
                  versículos,{' '}
                  {saved.verses
                     .sort((a, b) => (a.verse > b.verse ? 1 : -1))
                     .map(v => v.verse)
                     .join(',')}
               </Style.CardLine>
               <Style.CardLine>{format(new Date(saved.date as any), 'dd/MM/yyyy HH:mm')}</Style.CardLine>
            </Style.Card>
         ))
      }
   }, [saveds])

   const getSaveds = useCallback(async () => {
      setIsLoadingSaveds(true)
      const result = await db.get()
      setSaveds(result)
      setIsLoadingSaveds(false)
   }, [db])

   useEffect(() => {
      getSaveds()
   }, [getSaveds])

   return isLoadingSaveds ? (
      <Style.Spinner>
         <LoadIcon />
      </Style.Spinner>
   ) : (
      <Style.Grid>{savedRender}</Style.Grid>
   )
}
