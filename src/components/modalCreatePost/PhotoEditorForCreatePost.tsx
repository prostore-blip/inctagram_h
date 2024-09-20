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
setPlugins(plugin_crop, plugin_finetune, plugin_filter, plugin_annotate)
const editorDefaults = {
  imageReader: createDefaultImageReader(),
  imageWriter: createDefaultImageWriter(),
  shapePreprocessor: createDefaultShapePreprocessor(),
  utils: ['crop', 'finetune', 'filter', 'annotate'],
  ...plugin_finetune_defaults,
  ...plugin_filter_defaults,
  ...markup_editor_defaults,
  locale: {
    ...LocaleCore,
    ...LocaleCrop,
    ...LocaleFinetune,
    ...LocaleFilter,
    ...LocaleAnnotate,
    ...LocaleMarkupEditor,
  },
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
      onLoad={res => {}}
      onProcess={callback}
      src={src ?? undefined}
    />
  )
}
