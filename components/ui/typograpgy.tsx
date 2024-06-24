import React from 'react';

export function H1({title}:{title:string}):React.ReactElement {
    return (
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
       {title}
      </h1>
    )
  }

  export function H2({title}:{title:string}):React.ReactElement {
    return (
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
       {title}
      </h2>
    )
  }
  
  export function H3({title}:{title:string}):React.ReactElement {
    return (
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {title}
      </h3>
    )
  }
  
  export function H4({title}:{title:string}):React.ReactElement {
    return (
      <h4 className="scroll-m-20 text-md font-normal tracking-tight">
       {title}
      </h4>
    )
  }
  
  export function H5({title="",className}:{title:string,className?:string}):React.ReactElement {
    return (
      <p className={`text-sm text-muted-foreground ${className}`}>
        {title}
      </p>
    )
  }

  export function H6({title}:{title:string}):React.ReactElement {
    return (
      <p className="text-sm font-semibold tracking-tight">
        {title}
      </p>
    )
  }

  export function H7({title}:{title:string}):React.ReactElement {
    return (
      <p className="text-xs font-medium tracking-tight">
        {title}
      </p>
    )
  }
  
  export function Blockquote({title}:{title:string}):React.ReactElement{
    return (
      <blockquote className="mt-6 border-l-2 pl-6 italic">
       {title}
      </blockquote>
    )
  }
  