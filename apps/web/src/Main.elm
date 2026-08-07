module Main exposing (main)

import Browser
import Html exposing (Html, a, div, footer, h1, li, main_, p, section, span, text, ul)
import Html.Attributes exposing (class, href, rel, target)


type alias Model =
    ()


type Msg
    = NoOp


main : Program () Model Msg
main =
    Browser.sandbox
        { init = ()
        , update = \_ model -> model
        , view = view
        }


view : Model -> Html Msg
view _ =
    main_ [ class "terminal" ]
        [ section [ class "prompt-block" ]
            [ p [ class "prompt" ]
                [ span [ class "muted" ] [ text "atqamz@home" ]
                , text " ~ $ whoami"
                ]
            , h1 [] [ text "Atqa Munzir" ]
            , p [ class "lede" ] [ text "game programmer · backend/infrastructure · based in indonesia" ]
            , p [ class "muted" ] [ text "I build games, multiplayer/backend systems, and the infrastructure around them." ]
            ]
        , section [ class "block" ]
            [ p [ class "prompt" ] [ text "$ cat current.txt" ]
            , p [] [ text "Senior Programmer @ YES2GAMES" ]
            ]
        , section [ class "block" ]
            [ p [ class "prompt" ] [ text "$ ls links/" ]
            , ul [ class "links" ]
                [ externalLink "github" "https://github.com/atqamz"
                , externalLink "linkedin" "https://linkedin.com/in/atqamunzir"
                , externalLink "email" "mailto:atqamz@gmail.com"
                , externalLink "resume" "https://resume.atqamz.com"
                ]
            ]
        , footer []
            [ span [ class "muted" ] [ text "elm 0.19.1 · static by design" ] ]
        ]


externalLink : String -> String -> Html Msg
externalLink label url =
    li []
        [ a
            ([ href url ]
                ++ if String.startsWith "http" url then
                    [ target "_blank", rel "noreferrer" ]

                   else
                    []
            )
            [ text label ]
        ]
