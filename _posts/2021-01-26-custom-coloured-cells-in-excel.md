---
layout: post
title:  "Custom coloured cells in Excel"
date:   2021-01-26 12:00:00
published: true
tags: ["General", "Development"]
categories: ["General", "Development"]
---

I was given an interesting problem recently. The requirement was for cells in an Excel spreadsheet to be colour coded on the basis of the text in the cell. Also the spreadsheet user needed to be able to maintain the colour coding and the spreadsheet user was an experienced Excel user but had no programming experience.

{% include widgets/image.html src='/images/jekyll/2021-01-01/typing.png' width='600' height='150' title='Typing' %}

For example the way it should work is that as the user types, or pastes, into the activity row the cell colour should automatically be set on the basis of the text in the cell, the colour should be removed is what is in the cell does not match any known text.

The text/colour combinations are stored and edited by the user on a separate `Reference` sheet.

{% include widgets/image.html src='/images/jekyll/2021-01-01/reference.png' width='150' height='600' title='Reference' %}

The first thing I needed to do is to attach some code to the sheet

This fragment of code is required on each sheet, however this is pretty simple as long as the user just copies an existing sheet.

{% highlight VBA linenos %}
Sub Worksheet_Change(ByVal Target As Range)

    On Error Resume Next
    Application.ScreenUpdating = False
    
    Call Module1.Recolour_Activity_Row(Target)
    
    Application.ScreenUpdating = True

End Sub
{% endhighlight %}

The recolour code simply iterates across all the cells in the passed range, which are all the cells that were changed by typing or pasting passed from the `Worksheet_Change` method. As it iterates across the text that is in the changed cells it looks for that text in the named range on the `Reference` sheet. If it finds the text it copies the background colour from where it has found a match, otherwise it sets the background colour to `xlColorIndexNone`

The user only wanted this behaviour to happen on row 2 of the sheet, so we only apply this logic to changed cells on that row.

{% highlight VBA linenos %}
Function Get_Activity_Header_Row_Number() As Integer
    Get_Activity_Header_Row_Number = 2
End Function

Function Get_Activities_Range() As Range
    Set Get_Activities_Range = Worksheets("Reference").Range("activities")
End Function

Sub Recolour_Activity_Row(ByVal cells As Range)

    Dim activitiesTable As Range
    Set activitiesTable = Get_Activities_Range()
    
    For Each targetCell In cells
        If targetCell.row = Get_Activity_Header_Row_Number() Then
            Set foundActivity = activitiesTable.Find(targetCell.Value, , xlValues, xlWhole)
            If foundActivity Is Nothing Then
                targetCell.Interior.ColorIndex = xlColorIndexNone
            Else
                targetCell.Interior.Color = foundActivity.Interior.Color
            End If
            Set foundActivity = Nothing
        End If
    Next

    Set targetCell = Nothing
    Set activitiesTable = Nothing

End Sub
{% endhighlight %}

So all the user has to ensure is that the text only appears once in the reference sheet (only the first one will be used if its there multiple times), and also that the named range encompasses app the cells

{% include widgets/image.html src='/images/jekyll/2021-01-01/range.png' width='150' height='600' title='Range' %}
