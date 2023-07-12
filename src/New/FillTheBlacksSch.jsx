import React, { useEffect, useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import "./FillTheBlanks.css";
import PopUp from "../../../Components/Quiz/Fill-in-the-blanks/PopUp";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Timer from "../../../Components/Quiz/Timer/Timer";
import { Progress } from "antd";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import QuizScore from "../QuizFeedBack/QuizScore";
import QuizFeedBackFTB from "../QuizFeedBack/QuizFeedBackFTB";

const QuizInfo = {
  QuizTime: 380,
  questions: [
    {
      id: 1,
      url: "data:image/jpeg;base64,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",
      hasPhoto: true,
      questionText: "The capital of France is ___.",
      correctAnswer: "Paris",
      userAnswer: "",
    },
    {
      id: 2,
      url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAkFBMVEX///8AAAD+/v4TExMQEBD7+/sNDQ329vbq6urz8/P4+Pjk5OQhISHW1tbv7++2trbBwcFnZ2fKysrf39/S0tKfn5+tra17e3uSkpIbGxuYmJi+vr7MzMyCgoIsLCxDQ0NhYWE3Nzd0dHRVVVWmpqYtLS1NTU2IiIg/Pz8lJSVQUFB1dXWTk5NsbGxBQUE5OTknAJQtAAAbNklEQVR4nO1dh5aqSrOmSJJzRgQEQRwZ3//tbncTzI6ic/5hr1vrnD2z3dJ2daWvAkhRf5RoGv834arZEGJwwjXUhKv+R0RP2+ts+KMmqSjR7M/v5VeInqSk1JzskKbns9dJ9G9zN9EGZ0P0ZBP8H9Dkfc6DwYmKNqeYPUHXZhTOiLefcNG0y/43NCmezcmJTt3rrBiczWYn0KwcxhSakzVNoX+bO0JzYfGNbc6ERXpKFaFzoPNgcJK7mBF7E6sI88p7Jta5ZmKDUzc6Hwn+45CLmoOq0W8Bw1nU8d7Y4rR+yH9MEyv+x6v/PL0jwRlw+IaS9Rf+dRbfMqIZBLRJeHm8+O/L771IPYO84C0BzoJmUwCaqGrzYK6jSdn1rFj894U4aU5mRvxNnLKYDYuTY9JcGCQ0q82+TLNRtilEz81hvEzzYW8qdppD+YDQG/F6HgxSUzY6G9Yw/fMF/2kQ+PW8xxZe/pBP0URRvHbZogVQp33Qu3ThL5zfOWmnAYAN9ytrP6bLaroL69/4mAQgEwJIJlz6prlfjsm0aQXlOwveJKyhOpIjQDTh6ncqHVf+cN2KFUA8db07JKXwjU3QAhaMl69+sxRwdq1W1NQSGH7CNh6SCYmEf0Z4beuzaz8i+lLFNbbFBsN8ehsu+OQnp/AMw75qBJOhb8/cydVcvpXweTOIxc20RW+SOviuAC/9KovTsf11h95UNIqSgcXb+KApOr0Ekf6TpRGLxKNqz+jJewX/i0tLcChiKt0u3NhwPxAZFyW43W9ayJOlGb7Ktroa8OEToeOd7OwyTFhQ4x96xyHEQZKw4E1eviO1gvVwTG23MtEPq2iihfGDtV/5iddpuFqTOdqCgvzONWQjgPdlQ8f1ZHJ5Txo/aNNzCLv+X3XYPoQ4n6vF0SgC8gD9WTtEmUCkyKlPAiEDeYxG1u//1pvhCE5rggIe7OtjuYul6HACNhy0ExbwbynidRII6UiH0Y7JTjsWu6URcTzLb7Tbl3549CAIKMs/cSol9FrakPBlT1zWHSU0aJvbGUBAjX+D1Z2LP8qheJXT4I/eCTj4o0OfCMSNtHdT9Ik5dc6md65bYg3m7cs/Wv0xq4sXVLwPwMiN6BX42Klpr3wk56FMopf96XVcH/Kxgix7p30bIH5Shi4sL17JYIz58SDFGlLviY+UsV1xZQNFv+h5biaQlfkQvws5asIum9yKuh+sUnrwdflSQ9QnIR/hE3kWqekjqfz4oSUoRWzksD0GutOd6l3M77XUKXqJgsvFWQfNf4FiyK9e2xOuCONLBbs/2OvEt1c/sBhBFCKvDOnwvrMmvZMCYZA/DC95A35S0EWHxUcYuiQPvsXL12ji8nhsLDp04uz3PwDMO6QyNroChRp+0LtTXbOgj/h8PnjnHgOzPLRIRVafr57QcQrtBaqwozXTORrs0wlIhbw/XayoD5ZbElybhCw6EnLFuSnpA2hDh9c5b50n5wfQIJO3c1jdCY6TCWFGKM42Ieo79HnkXGuyCRGZJMsPnkhDEOe+Leq9V8TWBU1NVOPMjxYjLs2JzdXkk/hClsl7F+seN36MEsQLyKeveMiIsOFj6sWGA8cYTBy89zuKKn31grEZsu/OZs+Ow4ZzERKHxrDhGI3bH6zgNXIadIJn4XaRAYJRSBEjfWkMloJ2FbJ9diCQMx9yoTNC8W/bW1FN+FCU5tK+5QqwRjI80y9u9AFxrDBKKBHhlvvqMnpNIp0o44jyKQy4Mfr+drnzt7FMqPSeJu53dAVUlyZkY8LskHNQ+PhMgLSNjJiBNjgtc2X9gkdwH/FYf5i368acUEPtwAlExAfKQ298A8n7FO1WGTkUhtxgfe7XPchO5YU9ccieSZp2EWNIPzD+U8fPEBS219rjenIdIf/9dlqa8a3aRb0BVi/26OjMc71SAYeKUFHCAfREQ4K3Ot2/fjwmQjaWO3uadFkoEPot8OflGa9P+fnqnJ8l9gVv1lC6rA1rHc8SrlQUcVf+ZTjyCmBDxF84IEd6N/qKbHRRJezPrupCwIl2xBmAh3RfOK7P+W2SQV/TuEyyDVLreytw6H2C5kFfF0Uwub6ZImXIY2zcoz0FY0hDEiceXzPPNyitsSojf9z0yhEAJM7FsvKBuOsu2sMlNyKLXfb3GwhH4DufjPSdtToG17fRhI0YPK38Wf3uu4CytSnJhXOTsUJc8gU+i7tjUYGtT/EmV1d+3WJnkvlZF5ayVXEBOhbYfuBebvwE7Trbs2CIS+adArexYhqFge2okCse5wX1DgUUe1lvIcmhOpO9i93xqraGA+O29ZltC9+EqdQ38Dtk/WuXyJR4Vavhcn5yWopo3QU0bsPfSz6H7UAYEoUcpQRdTkXj06UN5B7Dcx+BsDkU1pnMzv7dXmH+AuHHDhux95uB9yadl3MCaMlPBHp/qMDQGa8MCLyjDEc08tuywop2UUZCKps+6nfQKbLJZ0Jd0sfJ9XMp4mVzsBccCsD1nbOkJXKZ0IQY4qyOe6I3XeiSD8qNWjFKUx5WzlAYSLH0JePx27q2AmGxeD1ndCHrfvHhfntJ8PChyDnO2TLv+CHcmuAROmJuBuTND90IMVfwsWgNPK5QGqPDRiw+4W7Oqghur2TIYpr7FbQan/FSgS9LOD1D+ZuUN7XdBeIU+nz+Ks88J0fpHFt2QO44ePC+tkveukqK8nPoP02ykwG7+1A92A/2repVl1RUoBCwJC7LOm7zjLl4/ZRCDUuUU9xlUd0i3niEKOwu9vI/9alOJWhvBu8U3EjExKO5ZYiF7PtSxia52oLj5rRuz9728R7IW1HwIwdToB/IznhF1LzkWj4GgFIE6QZrUYarBSwLyWPXO4qQjqDosYUKwfWpG8fUrEAbv9Jhj9gtgq/HM+VC8nuU/cAeEWCAV1wUrEya+QzJIa7Qpw7NEUHR+w4SwOqBvp2oqLgePIt+s1lgHMFXJt+AOEt0PM7uvNGwIhbIpz/UV6Sq8BBjRhkopIxIyX0XiuXPdxJAeYbVZFWWbd0Pm0spDuWRO1NZ2s0NGaN/+4K0vfUOG7lSv8M3AnmD1xV9k58qSCIWlYzrI9ngGrvyPpLkWpWPEpJve05xrZxF0YEr+rWnreiDedF05qrXe3ZQjN8NELozPZXB+ZYJbads2qPGuI1wbHxkwOkjgoLVdfVj09s4M5ojU8/wN7h6yh049JS2hYtsQNRREDPxi2tymjou3Sx8BXsPgenfLRzuf4wD596zK3Wg7BoBQwQrNuUro1L00Dt9Sn5xX2YSSrcH2EJ0WrEm5EGY9SAmx/JSoUExX6sA+STNX/c+Ub3XRpLUBC4wkMXi9FpB1Gvr4Qecc0o0/crz39Q+bvjFcMgrr/C+hpRAxbz6iTo4AB1cidSUYuxX2dCkFnkvHhHGQHmGRFQzTdwr1ywaScMrSqiMJdSXO7FPcmh1HArybm90AKbAGdBQRo2wiZxokAm5TJy/TgkJ8KmLEDxkJGIt6nCQU3hkiK5Jfn+TvjozHKo/tXznfTfpaQ+jZ+SHAQFUhEMp2bDKaDPBecTidrgijJKgYuv4uBrJOGaGNulwpObfh365GVWSy+/mBzQ6SwR8kzIYWDwpjTxDz/HoBC1ZdeH1gU6ro9j3NdEiaQBVn3MoIIiRoXDCwI7WEoXdrLpqFc6p18AnnVOMjomndg9WYjOyS8vu3j9S4ny6sJ/0zZbCrSMT/Wa4pKyJ/tsQiSZnCYjsNyy/3Rc8wzI+EFDVt1ocynULvivZCD5T90L0Huz3KIKFYRmup9ouxtvPJoVP0xexQ24LORkssQ8hKA0oVVd4i8ziNNHWsD7x0E2F8Z27J64C+Zh9uGG7zEVoYDBEuK129+ZkhDppAS470lMoGmCEtCvTDeHFhVWnppza9i3TIEJhK+ukIRlu6ZZlA+fEM2GjhEhN/YA/7OCLOJXWZKq+gXizmdQlA/ckJavB+002Gkag5MLWwRnRrt7q7YEStCAlWlqZaWHbdtR6gtZmX36x9rxY191Yj43Yc6OgrusoWGdVvmE6Zlke5UQ42fC8HA4uCS97KAkjwhmj/8WIP0P8N7egPHefaEiThByHCJ0y+E4HWWh0nOY3YXh4jDYkTVYdzy+2vafAuSfP5l1eVcKaWLPbWfMwP34JJn+h96sgkzLqsOAsQN4QlySkGjY4uHOigRv30JXylmJWig8+/2SjkiDHdWJuDmZF5o2w+SKlJrUuuS+Y9Pj1UoaLyybteyTbFL1UdLX0EJpVccPJQ0ErW7cImBWBYOj6BlgIOpRfKfmav1scu4XrOTsOCpL7pTgK8AwWm6d0owLZbYQtpB/iUBKW3tcmsyhxMwC0dmVvSsOhLBS1cS17o5C95TxbyhLGMnrOjHjRvkgdHjzMQNST4ruKGqT6WIgmEMNXwb9ZOpPTT7AnWK6ZeEviYQRt1QO0hYLND6EUsQW2ybzYz3E4wFoGqS1A6lZ+PqSfNn/N4COy1f36G+XsTozwK84+PAUHD+kqYZc/0ts+K5mGTVfk5WQ7ReHAWGW423AwQ9hs2bHzArbK4AMYKod2eLHiE8kLJyDQhGEd8jx2AYWNsfulYTuPS+9TyICha13EYWmjoLfbIIx5yFm2b3ixG09Y0sgXwpeqd0esJafp30sDSwu1bJXqAJCLGEVdqKoM1Qlwul2AeI3sTXzobF7NecADPo4coTQ0c9dDR4/F5QUjSBFuYYfKDMphj/DmngnaaLNleR3maU2t27XCpr7OgH/et+BWcFKsaz9wMwuXAawImpK3KAfN/bzoevoAYdUx2LD4byk0K5YdxgYW5WGAYBf8LW2Nsvtqi40MzjrNn73kqwbTM9cxOh/JthAu221wyTDL6r1b6hzFLQvupEP5bn8bkRqX4DhIVVAOkYZKVmew4hvcKWSbdQekU4ShLV21U4ZvvdonhlMPydEVIDHWMhX5VzmuZsV+ogmOoZJhPlk0dPXL8nHwkWTHcB3ViOOYo/IsRVbK9YJ3PyBDE8Lunhib5xGqRMIyhKBhN34RskMTG/dgv5sdQ2RJsg9J9ZW+eENT6Myxoqn3wACn7f2vna/bRLAc7WWem3mOSgs3woVHagSWsmk9xL3uLkrdLLKqMNt1tl5/+f69BtJ9kg7QJYV5FYa8aWaITRwgeGZwpMSZMiT1YxWDMFZDoZBWB47z8ppahsdu+SmJklr6gWwtpL7i58VK4Wn3gZG9rwl+kiRVRwZhRLTuLW1BFLQFIkniuFcZ1BGEZBBXNiVnjIKTIb7P8hh2G44Msqy0XKXYJtMA2xWKmHzKdRb4yI+6CLd1lstJdAyHcHOeYl5drAFfHGvfkv6gZ/MkBZ1XCfAg3VgHGtg6/R2nC+jHiodmQVnfARO2j8ZcNI2uo16hRGHv7yGrS0u8dP7c2kNyPWUzbk5mvWAXvj0tZLchCnfIZcVmyDxB+aqUSSHt4ZDL0ufBT5bYzFSBaqov17jTveOQbRpHxdMSLnPVcWG9qY5nsvihX3ebcPGBoDJLsvDE0Er5gUM+RAExNvZb9Gt7e9d6YuuGKpOJmewAVas/P90vwWqzDsdKq+Cd1BTaSbcIOkXTNCHz7Qpd2XlQTBbhGZ7FkHRUU2Sf5FUe3Az6SdrLyRhM9gZq7OMX3h7ytBq0zDYCl6pdjVJ96YGzIDMnwxy2CtVJbfwK3z1FS0BbVhRWgUvim4ZtmOPfmRXmjlc2OXmRxw4Jcku4VB0pIOYprFAgD5vj63qh+5SN6z1RdX+okqOsjW+NHY0EmtEOFzdc9WMSBc9rEX7JgdnkmyY1v/zI1S1HtVRVtW1ZE2WUsNuIVEyyKGPSOEpw9H2b5gThIdqtk0i3BY7rgpsKeIhMKpi19vrt9l5eb0Pfhx7z2nEdWd1dkehPeNUO3TTxXT22UajRRPF6TucxcQtBE1Q9qpN1tsVDUavNqli7S4GLcKmifnZKmzuzUTVHwQrGtmsJDXTZIsIUHPPqJAZ3M47ZKkVjxXiJYY6TjbisSTYfpm0Zi5R+2VoxDjcnfuTs/O8Jz/Dj4Dtl5OSfsQTtJqwnFayOeY9jctTB+F65HMInpUepU0CvoC7dNgc4uNaVTt0UwfIsG7TNLc/vDFWPMZOSGpuuF/e5pznxtrkBkshOmkWUC3LpUr5EtR5lvQHrbassDlXg/KhX3PLk/hWu89GkroOBkE3sHGss4tBaNlde7TnqZWizPmUuxqC6FKhHPv0JkivY+oVv2A+XqfzVsYUu9lGIxwN8ZI0kLYbo7yHPdis4PU+LJzzDC7es1zsz4EimwJtkjup2GcDNw1NXo5vkFke/O2jVUVe+VRJuNdvavtSKeo1ileQ5ydMRKfAVYl82NHtquV+Z3elfMbkAxdyNqrwUDLe760hJApqSGuS3+L6ooMJX5X34uQcDIe+qmHlEaW4RaYmKzf2BedELKz80neZFSdu3VaxC8Z1bVqQWxTH8b4b2KKxIByjOQ2U7eGADHozeTSWZUtGaCWMXHgQc7HXVTIOcovb3m+zad5UVamd6X014dJSiXkBx1d0u2yxJR9QiZdAQEQ4zynYLtdphdkuPv5337PCa7DDaIpfmO9tCi7ZCKiKlUv09cg/3DEIr0h5HLlWRMiz7ONCE/hf0Fr6902s5C6HFcaRyQWlRTvDu2kICF30zxIPzQEbjS0C/vhzzfyDJJhtbUDit7m4y5whOEG5B4MDcNkqnR7TFefs8992rk1iUyLT8MZOSVyG/i4cad3tY9dU9wIU8DuU9mEPex6LTWhjH1P5jomO9Rl4+Dzcd3+4mqXMoAvf8HpLRlQpRhjjY+LpGCeKOZ5Vxjlhq+P6GvabvHlsMn3fRovajtjKyD1TeXiVblwtIq7ZnxwNkhmmhC+eo7yJS0M4ez3xVm5W7gizYHxPe5AsLkU1rDSNWV0EQDiK5m+4D/ofb9T9PauH7G9j2dxrEZmlZRVZcN6VvBkJBr1PSNeb71h0CfOUKdxH4AqWgq1SNob9dn2Rjmsvy6f7WSr9IGfLuxqIHfZEXgK/egVW3ETMtez7pkxeJjjyLjoIfMcOQZRXfFekSR382jCxcJPfw2Icq/GLQvyINiYDMZi3aKq3WXunp93LwR9sSjdInKTWTo4SbkNKwfKbSnEXuquYz3dBKAucAnr8j4faeu2b37eLWRdHQrpT+lrKFefNOCFwf5WgZoRprvQnKdEktHzCqLV2sESg5xHrZ4HKQ0o92k7bXwolw98Q3po/XaBpFd8VBlXSiSHAQTia46XN/USoZE5RLXBxrGf3G5yJnQ2c7sDI3Fe2Vbqz8mnmsYpwaZDnbsxmaolN0oYNVSjFtzbzrpUyeadALlIv6eMBernSHi/H8vWEee5WXjxUJVyitwThxwYPiXZVBu2uE0jKJV+UoyZAo6+eS20LDbJKkSfk+3oUQ9XCOP0wOFwsDtKVXGXqbyE618tamTOle7ZDGUV+PP3m7XYCS7zTc61CQ9iT+R+5jHUmO3cjFcy4D6V7WP29hEoeLvJXRIq3orkMfVj5V+CCvZbemNhR1kKiyppD6X9yjjIyCtKrFAMC81x96d1JGUo1YLxOzasJ+1B2JUh5KXi+QmHzrMuUiHXUWloQHZwRKwPkvAoopLa1EKr3YKY0fDwQK8Uw1/HBH2EdIktWlobuI20N+yF/OzR+2BjhPEq5Y2G9Y9tAZX/0NTWH8h8+wvJ5teP+xJ/T1mlukp1/dyx7y87vPP1nxJXqDw3sdehE7vC7PFXWU1jTvPSHrXXpHhveePiVZsVuYnUEU2ypLf+Hph7Yo69TyCfXotHQqm3du0hBsK/Cj0atJ5fryBsu3CAUrmTIdJ6Kynypk9PBQmCkcPrDgZbYu0qFEG2+LnVllUzXVufKNdrrLD8tA84ylu174y0ep74C2Jj3bGZEhUokdX5eAdCVX+IbpdXMZ+ShHLF/4CP24pH3rZvvSE/XS8JaZBz4Uj4p8XdSd+Cw3SbTDXPgCcxuVFx1YGVIz5f3h9Beqg3DHCw2+r74QjHZm3x3VI3uWqeA2Kjx907SIQVNqUzmx6HrLVT1MRY/kZbvx2UBU4hq6/vWDTyCtIMOi8IyuVu8oV6UMOvUoq36Udvy0xzdjodpVzmiJUy9aVWVdZ8fBdDXw/eynzomN+8Ex2NK3Ri3rIK0itwlcnYqzrUstJ/mJo2Z++mn+9rrNVsrRlLR6v878n0phPnpP7ZmenVCqrMraSgcbgUya+pJ9/odrb9LvfU2B/rVpV9295h0JDi2V7k8ZhlirbkRzJ26r319bVK8+vKRj7ncYLKNoFQSr6MTzLMNm2ybryeBUOx/ve4Z+cbrfziCsNmx6ks7uzCLNosmfOa2z+1v3MEiJAqEZbM6eMIF0L/bayfNZk6zpN1RUwI8BSiuAVVosz5JQs6oOm3p6AnW2U+nZG50+L8FdE8VRxTSGdxp/aSpOs9qd3vc6FwZNSd2tCv/9NwroO1dvAQJLtU4xlqz4QZGFkxOL8UGKIulOoVxbbPEtc/b2v+3CJFltlK7nuu4FKxyHp4hs+w2N6S91W0rmwC4W9pdotxvdnPqk20lklLzShNvMuzQ1j8/90lJfQdyndPIkTOGrWENUG4lgHQrfRmnhf/e0fWQQ1ho2+bq4KDmVgSqWq6qNjGlDIJjGo9FKoYxjgZhzPH29SXvgId2Z1FLfu/G5CFXXzHcmuVH9msTNAtfNH98G9ie+eEfOim0V3rhPR5Y52ZAFuzOXy9AkyIc6TimnEdWaUp3Oj5wS/We+9FXySoMSb6iN4+8qd4yKlzu18qAs116ZGVm1j3b1RrjI8H4NU36Sxoh1q5LjHvCNF1S1t11KT1S+uUA88/l6titjWvYJe2eBfeikLx3ji48h+VMkhP8z0PVLdCWK/9bV/z+9S7O1pWfpH2ePmo8Ip1WLf68O9HmaxOFMeCM0kcE/gZqfosnfqDobFZ0qirl4mb+vam9/m+Nfpze/xGoO379MT5fD577i61fpLS2dh8N/U0k/to/foelftDYPBX3zy9ZmwuM/7WbeDhN/nsO3p9X+Ov39HRKaeJL0LMAIoUmVe3raZf8rmtah/4WN9Et/fMWJ7v4fFiA1j0jW06ysaRLR02Hl/9NfoF/0iH+DZhOxp9M/zeArz/H/n9N8djqRJtfDP72R36OJoOTT2/g1mt7T+PROfov+vDDe29/fh1z/fEvj/GvMJ1z+uZ38Er0Hm/4+f+9u8c/b4Dsc0rNoYb/jB2cgvjcZ/PtR4t3O0p/P7Ojxj6kL/HEG54BFRnrDV8yB3hlB+OhGfo+mKNt89BPTtJHIOxf9H1GzmAGfoWn2AAAAAElFTkSuQmCC",
      hasPhoto: true,
      questionText: "The highest mountain in the world is ___.",
      correctAnswer: "Mount Everest",
      userAnswer: "",
    },
    // Add more questions here
  ],
};

const FillTheBlanksSch = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [sending, setSending] = useState(false);
  const [selectedAns, setSelectedAns] = useState([]);
  //score
  const [score, setScore] = useState(0);
  //modal
  const [showScore, setShowScore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  //timer
  const [timeLeft, setTimeLeft] = useState(QuizInfo.QuizTime);
  const [timeIsUp, setTimeIsUp] = useState(false);
  const [isToastShown, setIsToastShown] = useState(false);


  useEffect(() => {
    if (timeLeft > 0 && !showScore) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    } else if (!showScore) {
      setShowScore(true);
      setTimeIsUp(true);
    }
  }, [timeLeft, showScore]);

  const handleSubmit = () => {
    const nextQuestion = currentQuestion + 1;
    const userAnswer = answer.trim().toLowerCase();
    const isCorrect =
      userAnswer ===
      QuizInfo.questions[currentQuestion].correctAnswer.toLowerCase();

    if (userAnswer === "") {

      if (!isToastShown) {
        toast.error("Please fill in the blanks!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setIsToastShown(true);
      }


      setSending(false);
    } else if (isCorrect) {
      // Increase the score if the user's answer is correct
      setScore(score + 1);
      setShowModal(false);
      setSending(true);

    } else {
      //wrong answer ? show modal +wait 3sec
      setShowModal(true);
      setSending(true);

      setTimeout(() => {
        setShowModal(false);
      }, 2000); // wait for 3 seconds before moving to the next question
    }

    // Only move to the next question if the answer is not empty
    if (userAnswer !== "") {
      setSelectedAns([...selectedAns, userAnswer]);
      setTimeout(() => {
        if (nextQuestion < QuizInfo.questions.length) {
          setAnswer("");
          setIsToastShown(false)
          setCurrentQuestion(nextQuestion);
      setSending(false);

        } else {
          setAnswer("");
          setShowScore(true);
        }
      }, 2000); // wait for 1 second before moving to the next question
    }
  };

  // Reset the quiz
  const resetQuiz = () => {
    setIsToastShown(false)
    setAnswer("");
    setSelectedAns([]);
    setSending(false);
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setShowScore(false);
    setTimeLeft(QuizInfo.QuizTime);
  };
  const progress = (currentQuestion / QuizInfo.questions.length) * 100;
  const { name } = useParams();
  return (
    <div className="main_content">
      {showScore ? (
        <>
          <div className="quiz-title-wrap">
            <h3 className="current-quiz-name">{name}</h3>
            <div className="quiz-reset">
              <QuizScore
                score={score}
                timeLeft={timeLeft}
                length={QuizInfo.questions.length}
              />
              <button onClick={() => resetQuiz()} className="quiz-reset-btn">
                Nouvel essai
              </button>
            </div>
          </div>
          <QuizFeedBackFTB
            questions={QuizInfo.questions}
            selectedAns={selectedAns}
          />
        </>
      ) : (
        <div className="timer-card-wrap ">
          <div className="multichoice-quiz-Card">
            <section className="muc-question-section">
              <h3 className="current-quiz-name">{name}</h3>

              <Timer timeLeft={timeLeft} />
              <Progress
                className="progressBar"
                percent={progress}
                status="active"
                strokeColor={{ from: "#25856B", to: "#25C4A4" }}
              />
            </section>
            <section className="answer-section">
              <h3 className="mb-5" id="Question">
                {QuizInfo.questions[currentQuestion]?.questionText}
              </h3>
              {QuizInfo.questions[currentQuestion].hasPhoto ? (
                <div className="quiz-photo-wrap">
                  <img
                    src={QuizInfo.questions[currentQuestion].url}
                    alt={QuizInfo.questions[currentQuestion].questionText}
                    className="quiz-photo-img"
                  />
                  
                </div>
              ) : null}
              <div key={currentQuestion}>
                <input
                  type="text"
                  name="answer"
                  autocomplete="off"
                  onChange={(event) => setAnswer(event.target.value)}
                />
              </div>

              <button
                disabled={sending}
                className="mt-5"
                id="quiz-dnd-next"
                onClick={() => handleSubmit()}
              >
                Valider
              </button>
            </section>
          </div>
        </div>
      )}
      <ToastContainer limit={1} />
    </div>
  );
};

export default FillTheBlanksSch;
