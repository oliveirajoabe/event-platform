import { CheckCircle, Lock } from "phosphor-react";
import { isPast, format } from "date-fns";
import ptBr from "date-fns/locale/pt-BR";
import { Link, useParams } from "react-router-dom";
import classNames from "classNames";

interface LessonProps {
  title: string;
  slug: string;
  availableAt: Date;
  type: "live" | "class";
}

export function Lesson(props: LessonProps) {
  const { slug } = useParams<{ slug: string }>();

  const isLessonAvailable = isPast(props.availableAt);
  const availableDateFormat = format(
    props.availableAt,
    "EEEE' • 'd' de 'MMMM' • 'K'h'mm",
    { locale: ptBr }
  );

  const isActiveLessson = slug === props.slug;

  return (
    <Link to={`/event/lesson/${props.slug}`} className="group">
      <span className="text-gray-300">{availableDateFormat}</span>
      <div
        className={classNames(
          "rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500",
          { "bg-green-500": isActiveLessson }
        )}
      >
        <header className="flex items-center justify-between">
          {isLessonAvailable ? (
            <span
              className={classNames(
                "text-sm font-medium flex items-center gap-2",
                {
                  "text-white": isActiveLessson,
                  "text-blue-500 ": !isActiveLessson,
                }
              )}
            >
              <CheckCircle size={20} />
              Conteúdo liberado
            </span>
          ) : (
            <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
              <Lock size={20} />
              Em breve
            </span>
          )}

          <span
            className={classNames(
              "text-xs rounded py-[0.125rem] px-2 text-white border border-green-300 font-bold",
              { "border-white": isActiveLessson }
            )}
          >
            {props.type === "live" ? "AO VIVO" : "AULA PRÁTICA"}
          </span>
        </header>
        <strong
          className={classNames(" mt-5 block", {
            "text-white": isActiveLessson,
            "text-gray-200": !isActiveLessson,
          })}
        >
          {props.title}
        </strong>
      </div>
    </Link>
  );
}
