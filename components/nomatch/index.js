import React from 'react'

export default ({ content }) => (
  <section>
    <span>{content || '对不起，该页面不存在！'}</span>
  </section>
)
