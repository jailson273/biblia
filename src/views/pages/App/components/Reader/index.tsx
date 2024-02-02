import { useMemo } from 'react'
import { Verse } from '@biblia/domain/verse/Verse'
import * as Style from './style'
import NextStepIcon from '@biblia/views/common/components/Icon/NextStepIcon'
import PreviewStepIcon from '@biblia/views/common/components/Icon/PreviewStepIcony'
import SaveIcon from '@biblia/views/common/components/Icon/SaveIcon'
import LoadIcon from '@biblia/views/common/components/Icon/LoadIcon'

interface IReader {
   verses: Verse[]
   choosed?: number
   isLoading?: boolean
   versesSelecteds?: Verse[]
   onPreview?: (preview: number) => void
   onNext?: (next: number) => void
   onClickSaveSelecteds?: (verses: Verse[]) => void
   onSelectVerse?: (verses: Verse[]) => void
}

export default function Reader({
   verses,
   choosed = 1,
   isLoading,
   versesSelecteds = [],
   onPreview,
   onNext,
   onClickSaveSelecteds,
   onSelectVerse
}: IReader) {
   const text = useMemo(() => {
      if (verses?.length > 0) {
         return verses.map(v => {
            const hash = `${v?.version}-${v?.bookId}-${v?.chapter}-${v?.verse}`
            return (
               <Style.Line
                  id={hash}
                  key={hash}
                  className={`${versesSelecteds.some(selected => selected.verse === v.verse) && 'line-selected'} ${
                     choosed === v.verse && 'choosed'
                  }`}
                  onClick={() => {
                     if (!versesSelecteds.some(selected => selected.verse === v.verse)) {
                        onSelectVerse?.([...versesSelecteds, v])
                     } else {
                        onSelectVerse?.(versesSelecteds.filter(s => s.verse !== v.verse))
                     }
                  }}
               >
                  <Style.Number>{String(v.verse)}</Style.Number>
                  <Style.Text>{v.text}</Style.Text>
               </Style.Line>
            )
         })
      }
   }, [verses, versesSelecteds, onSelectVerse, choosed])

   return (
      <>
         <Style.Grid>
            {isLoading ? (
               <Style.Spinner>
                  <LoadIcon />
               </Style.Spinner>
            ) : (
               text
            )}

            <Style.Toolbar>
               <Style.ButtonStep className="preview" onClick={() => onPreview?.(verses[0].chapter - 1)}>
                  <PreviewStepIcon />
                  Anterior
               </Style.ButtonStep>
               {versesSelecteds.length > 0 && (
                  <Style.ButtonSave onClick={() => onClickSaveSelecteds?.(versesSelecteds)}>
                     <SaveIcon />
                  </Style.ButtonSave>
               )}
               <Style.ButtonStep className="next" onClick={() => onNext?.(verses[0].chapter + 1)}>
                  Próximo
                  <NextStepIcon />
               </Style.ButtonStep>
            </Style.Toolbar>
         </Style.Grid>
      </>
   )
}
