import React from 'react'

import {
  PinturaDefaultImageWriterResult,
  createDefaultImageReader,
  createDefaultImageWriter,
  createDefaultShapePreprocessor,
  markup_editor_defaults,
  plugin_annotate,
  plugin_crop,
  plugin_filter,
  plugin_filter_defaults,
  plugin_finetune,
  plugin_finetune_defaults,
  setPlugins,
} from '@pqina/pintura'
import {
  LocaleAnnotate,
  LocaleCore,
  LocaleCrop,
  LocaleFilter,
  LocaleFinetune,
  LocaleMarkupEditor,
} from '@pqina/pintura/locale/en_GB'
import { PinturaEditor } from '@pqina/react-pintura'

import st from '@pqina/pintura/pintura.module.css'
setPlugins(plugin_crop, plugin_annotate, plugin_filter, plugin_finetune)
const editorDefaults = {
  imageReader: createDefaultImageReader(),
  imageWriter: createDefaultImageWriter(),
  ...markup_editor_defaults,
  locale: {
    ...LocaleCore,
    ...LocaleCrop,
    ...LocaleFinetune,
    ...LocaleFilter,
    ...LocaleAnnotate,
    ...LocaleMarkupEditor,
  },
  shapePreprocessor: createDefaultShapePreprocessor(),
  ...plugin_finetune_defaults,
  ...plugin_filter_defaults,
  utils: ['crop', 'finetune', 'filter', 'annotate'],
}

type EditorProps = {
  callback: (d: PinturaDefaultImageWriterResult) => void
  src: null | string
}
export const PhotoEditorForCreatePost = ({ callback, src }: EditorProps) => {
  return (
    <PinturaEditor
      {...editorDefaults}
      className={`${st.pintura}`}
      imageCropAspectRatio={1}
      onProcess={callback}
      src={src ?? undefined}
      willRenderCanvas={(shapes, state) => {
        const { backgroundColor, lineColor, selectionRect } = state
        const { height, width, x, y } = selectionRect

        return {
          ...shapes,
          interfaceShapes: [
            {
              backgroundColor: [...backgroundColor, 0.5],
              inverted: true,
              rx: width * 0.5,
              ry: height * 0.5,
              strokeColor: [...lineColor],
              strokeWidth: 1,
              x: x + width * 0.5,
              y: y + height * 0.5,
            },
            ...shapes.interfaceShapes,
          ],
        }
      }}
    />
  )
}
